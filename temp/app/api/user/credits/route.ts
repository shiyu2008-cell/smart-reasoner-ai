/**
 * 用户积分查询 API 路由
 * 
 * 提供当前登录用户的积分信息查询服务，用于同步前端显示与数据库实际积分。
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from '@/lib/auth';
import { getUserCredits, CreditError } from '@/lib/credit-service';

// API需要动态处理
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET 请求处理函数
 * 
 * 返回当前登录用户的积分信息（评估次数、优化次数等）
 */
export async function GET(request: NextRequest) {
  try {
    // 获取用户会话
    const session = await auth.api.getSession({
      headers: Object.fromEntries(request.headers),
    });
    
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json(
        { 
          success: false,
          error: '未登录',
          message: '请先登录以查询积分信息'
        },
        { status: 401 }
      );
    }
    
    console.log('用户积分查询API请求:', { userId });
    
    // 检查开发者模式请求头
    const isDeveloperMode = request.headers.get('X-Developer-Mode') === 'true';
    
    if (isDeveloperMode) {
      // 开发者模式：返回固定5000次
      return NextResponse.json({
        success: true,
        credits: {
          userId,
          evaluationCredits: 5000,
          optimizationCredits: 5000,
          totalEvaluations: 0,
          totalOptimizations: 0,
        },
        message: '开发者模式，次数固定为5000'
      });
    }
    
    // 正常模式：从数据库获取用户积分
    const credits = await getUserCredits(userId);
    
    return NextResponse.json({
      success: true,
      credits,
      message: '积分查询成功'
    });
    
  } catch (error) {
    console.error('用户积分查询API错误:', error);
    
    if (error instanceof CreditError) {
      return NextResponse.json(
        { 
          success: false,
          error: error.code,
          message: error.message
        },
        { status: error.code === 'USER_NOT_FOUND' ? 404 : 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: 'DATABASE_ERROR',
        message: `查询积分失败: ${error instanceof Error ? error.message : '未知错误'}`
      },
      { status: 500 }
    );
  }
}

/**
 * POST 请求处理函数（可选：用于同步本地存储与数据库）
 * 
 * 接收本地存储的积分数据，与数据库同步后返回实际值
 */
export async function POST(request: NextRequest) {
  try {
    // 获取用户会话
    const session = await auth.api.getSession({
      headers: Object.fromEntries(request.headers),
    });
    
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json(
        { 
          success: false,
          error: '未登录',
          message: '请先登录以同步积分信息'
        },
        { status: 401 }
      );
    }
    
    const body = await request.json().catch(() => ({}));
    const localEvaluationCredits = body.evaluationCredits;
    const localOptimizationCredits = body.optimizationCredits;
    
    console.log('用户积分同步API请求:', { 
      userId, 
      localEvaluationCredits, 
      localOptimizationCredits 
    });
    
    // 检查开发者模式请求头
    const isDeveloperMode = request.headers.get('X-Developer-Mode') === 'true';
    
    if (isDeveloperMode) {
      // 开发者模式：返回固定5000次
      return NextResponse.json({
        success: true,
        credits: {
          userId,
          evaluationCredits: 5000,
          optimizationCredits: 5000,
          totalEvaluations: 0,
          totalOptimizations: 0,
        },
        message: '开发者模式，次数固定为5000',
        syncRequired: false
      });
    }
    
    // 获取数据库中的实际积分
    const dbCredits = await getUserCredits(userId);
    
    // 判断是否需要同步（本地值与数据库值差异较大时）
    const evalDiff = Math.abs((localEvaluationCredits || 0) - dbCredits.evaluationCredits);
    const optDiff = Math.abs((localOptimizationCredits || 0) - dbCredits.optimizationCredits);
    const syncRequired = evalDiff > 1 || optDiff > 1; // 差异大于1次时需要同步
    
    return NextResponse.json({
      success: true,
      credits: dbCredits,
      message: syncRequired ? '积分已从数据库同步' : '积分一致，无需同步',
      syncRequired
    });
    
  } catch (error) {
    console.error('用户积分同步API错误:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'SYNC_ERROR',
        message: `积分同步失败: ${error instanceof Error ? error.message : '未知错误'}`
      },
      { status: 500 }
    );
  }
}