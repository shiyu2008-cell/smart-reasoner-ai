/**
 * 简历智能评估 API 路由
 * 
 * 提供简历与职位匹配度评估服务，接收简历和职位描述，返回结构化评估结果。
 * 评估结果用于决定是否允许后续的"一键优化"功能。
 */

import { NextRequest, NextResponse } from "next/server"
import { evaluateResume, EvaluateResumeRequest } from '@/lib/ai-service';
import { auth } from '@/lib/auth';
import { deductCredits, CreditError } from '@/lib/credit-service';

// 评估API需要动态处理
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // 或 'edge' 如果使用 Edge Runtime

/**
 * POST 请求处理函数
 * 
 * 接收 JSON 格式的请求体，包含 resume 和 jobDescription 字段
 * 返回结构化评估结果（JSON格式）
 */
export async function POST(request: NextRequest) {
  try {
    // 验证用户会话
    const session = await auth.api.getSession({
      headers: Object.fromEntries(request.headers),
    });
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { 
          success: false,
          error: '未授权访问',
          message: '请先登录后再使用评估服务'
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    
    // 解析请求体
    const body: EvaluateResumeRequest = await request.json();
    
    // 验证必要字段
    if (!body.resume || !body.jobDescription) {
      return NextResponse.json(
        { error: '缺少必要字段：resume 和 jobDescription 不能为空' },
        { status: 400 }
      );
    }

    // 验证内容长度（防止滥用）
    if (body.resume.length > 10000) {
      return NextResponse.json(
        { error: '简历内容过长，请限制在10000字符以内' },
        { status: 400 }
      );
    }
    
    if (body.jobDescription.length > 5000) {
      return NextResponse.json(
        { error: '职位描述过长，请限制在5000字符以内' },
        { status: 400 }
      );
    }

    console.log('简历评估API请求:', {
      userId,
      resumeLength: body.resume.length,
      jobDescriptionLength: body.jobDescription.length,
      hasConfig: !!body.config
    });

    // 扣减评估次数
    const creditResult = await deductCredits(userId, 'evaluate', 1);
    
    if (!creditResult.success) {
      return NextResponse.json(
        { 
          success: false,
          error: '次数不足',
          message: creditResult.message || '评估次数不足，请购买套餐或等待重置',
          remainingEvaluationCredits: creditResult.remainingEvaluationCredits,
          remainingOptimizationCredits: creditResult.remainingOptimizationCredits
        },
        { status: 403 }
      );
    }

    // 获取评估结果
    const evaluationResult = await evaluateResume(body);

    // 返回结构化评估结果，包含剩余次数信息
    return NextResponse.json({
      success: true,
      data: evaluationResult,
      credits: {
        remainingEvaluationCredits: creditResult.remainingEvaluationCredits,
        remainingOptimizationCredits: creditResult.remainingOptimizationCredits,
        message: `评估成功，剩余 ${creditResult.remainingEvaluationCredits} 次评估次数`
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('简历评估 API 错误:', error);
    
    // 处理次数相关错误
    if (error instanceof CreditError) {
      return NextResponse.json(
        { 
          success: false,
          error: '次数处理失败',
          message: error.message,
          code: error.code
        },
        { status: 403 }
      );
    }
    
    // 根据错误类型返回适当的错误响应
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    const statusCode = errorMessage.includes('环境变量') ? 500 : 
                      errorMessage.includes('缺少必要字段') ? 400 : 
                      errorMessage.includes('过长') ? 400 : 500;
    
    return NextResponse.json(
      { 
        success: false,
        error: '评估服务暂时不可用',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}

/**
 * GET 请求处理函数 - 用于测试 API 是否可用
 */
export async function GET() {
  return NextResponse.json({
    message: '简历智能评估 API 已就绪',
    version: '1.0.0',
    status: 'AI驱动模式',
    endpoints: {
      POST: '/api/evaluate',
      description: '接收简历和职位描述，返回结构化评估结果',
      requestFormat: {
        resume: 'string (简历内容)',
        jobDescription: 'string (职位描述)',
        config: 'optional (AI配置参数)'
      },
      responseFormat: {
        success: 'boolean',
        data: 'EvaluationResult',
        timestamp: 'string'
      }
    },
    features: [
      '匹配度量化打分 (0-100)',
      '能力分析与建议',
      '优化允许性判断',
      '个性化学习建议',
      '备选职业推荐'
    ]
  });
}

// 其他 HTTP 方法不支持
export async function PUT() {
  return NextResponse.json({ 
    error: '方法不支持',
    allowedMethods: ['GET', 'POST']
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ 
    error: '方法不支持',
    allowedMethods: ['GET', 'POST']
  }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ 
    error: '方法不支持', 
    allowedMethods: ['GET', 'POST']
  }, { status: 405 });
}