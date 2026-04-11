import { NextRequest, NextResponse } from "next/server";
import { getUserCredits, addCredits, resetCredits, CreditError } from "@/lib/credit-service";
import { validateAdminAccess } from "@/lib/admin-utils";

/**
 * GET /api/admin/credits/[userId]
 * 获取指定用户的次数信息（管理员功能）
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
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

    const { userId } = await params;

    // 获取用户次数信息
    const credits = await getUserCredits(userId);

    return NextResponse.json({
      success: true,
      data: {
        userId: credits.userId,
        credits: {
          evaluation: credits.evaluationCredits,
          optimization: credits.optimizationCredits,
          totalEvaluations: credits.totalEvaluations,
          totalOptimizations: credits.totalOptimizations,
        },
        usageStats: {
          evaluationUsageRate: credits.totalEvaluations > 0 
            ? Math.round((credits.totalEvaluations / (credits.totalEvaluations + credits.evaluationCredits)) * 100) 
            : 0,
          optimizationUsageRate: credits.totalOptimizations > 0 
            ? Math.round((credits.totalOptimizations / (credits.totalOptimizations + credits.optimizationCredits)) * 100) 
            : 0,
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("管理员获取用户次数错误:", error);
    
    if (error instanceof CreditError) {
      return NextResponse.json(
        { 
          success: false,
          error: "获取用户次数失败",
          message: error.message,
          code: error.code
        },
        { status: error.code === 'USER_NOT_FOUND' ? 404 : 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: "获取用户次数失败",
        message: error instanceof Error ? error.message : "未知错误",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/credits/[userId]
 * 更新指定用户的次数（管理员功能）
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
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

    const { userId } = await params;
    const body = await request.json();
    
    // 验证操作类型
    const operation = body.operation; // 'add', 'set', 'reset'
    
    let result;
    
    switch (operation) {
      case 'add':
        // 添加次数
        if (body.evaluationCredits === undefined && body.optimizationCredits === undefined) {
          return NextResponse.json(
            { 
              success: false,
              error: "缺少必要字段",
              message: "至少需要提供 evaluationCredits 或 optimizationCredits 字段"
            },
            { status: 400 }
          );
        }
        
        result = await addCredits(
          userId, 
          body.evaluationCredits || 0, 
          body.optimizationCredits || 0
        );
        break;
        
      case 'set':
        // 设置次数（直接覆盖）
        if (body.evaluationCredits === undefined || body.optimizationCredits === undefined) {
          return NextResponse.json(
            { 
              success: false,
              error: "缺少必要字段",
              message: "必须提供 evaluationCredits 和 optimizationCredits 字段"
            },
            { status: 400 }
          );
        }
        
        result = await resetCredits(
          userId,
          body.evaluationCredits,
          body.optimizationCredits
        );
        break;
        
      case 'reset':
        // 重置为默认次数（从环境变量读取：评估3次，优化0次）
        result = await resetCredits(userId);
        break;
        
      default:
        return NextResponse.json(
          { 
            success: false,
            error: "无效的操作类型",
            message: "operation 必须是 'add', 'set' 或 'reset'",
            validOperations: ["add", "set", "reset"]
          },
          { status: 400 }
        );
    }
    
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: "更新次数失败",
          message: result.message,
          remainingEvaluationCredits: result.remainingEvaluationCredits,
          remainingOptimizationCredits: result.remainingOptimizationCredits
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        userId,
        operation,
        credits: {
          evaluation: result.remainingEvaluationCredits,
          optimization: result.remainingOptimizationCredits,
        },
        changes: {
          evaluationCredits: body.evaluationCredits,
          optimizationCredits: body.optimizationCredits,
        }
      },
      message: result.message,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("管理员更新用户次数错误:", error);
    
    if (error instanceof CreditError) {
      return NextResponse.json(
        { 
          success: false,
          error: "更新用户次数失败",
          message: error.message,
          code: error.code
        },
        { status: error.code === 'USER_NOT_FOUND' ? 404 : 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: "更新用户次数失败",
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