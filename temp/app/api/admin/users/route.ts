import { NextRequest, NextResponse } from "next/server";
import { validateAdminAccess } from "@/lib/admin-utils";

/**
 * GET /api/admin/users
 * 获取用户列表（管理员功能）
 */
export async function GET(request: NextRequest) {
  try {
    // 验证管理员权限
    const accessCheck = validateAdminAccess(request);
    if (!accessCheck.success) {
      return NextResponse.json(
        { 
          success: false,
          error: "未授权访问",
          message: accessCheck.message
        },
        { status: 403 }
      );
    }

    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    // 查询用户数据
    // 使用Better Auth Admin API查询用户列表
    const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
    const queryParams = new URLSearchParams({
      ...(search && { searchValue: search }),
      ...(search && { searchField: "email" }),
      searchOperator: "contains",
      limit: limit.toString(),
      offset: offset.toString(),
      sortBy: "createdAt",
      sortDirection: "desc",
    });

    const listUsersResponse = await fetch(`${baseUrl}/admin/list-users?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-admin-api-key": process.env.ADMIN_API_KEY || "",
      },
    });

    if (!listUsersResponse.ok) {
      throw new Error(`获取用户列表失败: ${listUsersResponse.status} ${listUsersResponse.statusText}`);
    }

    const listUsersResult = await listUsersResponse.json();
    const users = listUsersResult.users || [];
    const totalCount = listUsersResult.total || 0;

    // 获取活跃会话数（可选）
    // 注意：Better Auth Admin API可能没有直接获取会话的端点
    // 这里简化处理，暂时返回0
    const userSessions: { userId: string }[] = [];
    // 如果需要会话数据，可能需要使用auth.api.getSession或其他方法
    // 暂时跳过会话查询

    const sessionCountMap = new Map<string, number>();
    userSessions.forEach(session => {
      sessionCountMap.set(session.userId, (sessionCountMap.get(session.userId) || 0) + 1);
    });

    // 格式化响应数据
    const formattedUsers = users.map((user: Record<string, unknown>) => ({
      id: user.id as string,
      email: user.email,
      name: user.name,
      username: user.username,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      credits: {
        evaluation: (user.evaluation_credits as number) || 0,
        optimization: (user.optimization_credits as number) || 0,
        totalEvaluations: (user.total_evaluations as number) || 0,
        totalOptimizations: (user.total_optimizations as number) || 0,
      },
      activeSessions: sessionCountMap.get(user.id as string) || 0,
    }));

    return NextResponse.json({
      success: true,
      data: {
        users: formattedUsers,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          hasNextPage: page < Math.ceil(totalCount / limit),
          hasPrevPage: page > 1,
        },
        stats: {
          totalUsers: totalCount,
          activeUsers: sessionCountMap.size,
          totalEvaluationCredits: users.reduce((sum: number, user: Record<string, unknown>) => sum + ((user.evaluation_credits as number) || 0), 0),
          totalOptimizationCredits: users.reduce((sum: number, user: Record<string, unknown>) => sum + ((user.optimization_credits as number) || 0), 0),
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("管理员获取用户列表错误:", error);
    
    return NextResponse.json(
      { 
        success: false,
        error: "获取用户列表失败",
        message: error instanceof Error ? error.message : "未知错误",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/users
 * 创建新用户（管理员功能）
 */
export async function POST(request: NextRequest) {
  try {
    // 验证管理员权限
    const accessCheck = validateAdminAccess(request);
    if (!accessCheck.success) {
      return NextResponse.json(
        { 
          success: false,
          error: "未授权访问",
          message: accessCheck.message
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // 验证必要字段
    if (!body.email || !body.password) {
      return NextResponse.json(
        { 
          success: false,
          error: "缺少必要字段",
          message: "邮箱和密码为必填字段"
        },
        { status: 400 }
      );
    }

    // 创建用户 - 使用Better Auth Admin API
    // 更新create-user API路径为新的端点格式
    const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
    const createUserResponse = await fetch(`${baseUrl}/admin/create-user`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-api-key": process.env.ADMIN_API_KEY || "",
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        name: body.name,
        username: body.username,
        // 自定义字段
        data: {
          evaluation_credits: body.evaluationCredits || 2,
          optimization_credits: body.optimizationCredits || 2,
          total_evaluations: 0,
          total_optimizations: 0,
        }
      }),
    });

    if (!createUserResponse.ok) {
      const errorText = await createUserResponse.text();
      throw new Error(`创建用户失败: ${createUserResponse.status} ${createUserResponse.statusText} - ${errorText}`);
    }

    const user = await createUserResponse.json();

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt,
        credits: {
          evaluation: user.evaluation_credits || 0,
          optimization: user.optimization_credits || 0,
        }
      },
      message: "用户创建成功",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("管理员创建用户错误:", error);
    
    return NextResponse.json(
      { 
        success: false,
        error: "创建用户失败",
        message: error instanceof Error ? error.message : "未知错误",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// 不支持其他HTTP方法
export async function PUT() {
  return NextResponse.json(
    { error: "方法不支持", allowedMethods: ["GET", "POST"] },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "方法不支持", allowedMethods: ["GET", "POST"] },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: "方法不支持", allowedMethods: ["GET", "POST"] },
    { status: 405 }
  );
}