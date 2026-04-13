/**
 * 简历优化 API 路由
 * 
 * 提供流式响应的简历优化服务，接收简历和职位描述，返回 AI 生成的优化建议。
 * 当前为模拟实现，后续可接入真实 AI 模型（如 OpenAI、DeepSeek）。
 */

import { NextRequest, NextResponse } from 'next/server';
import { optimizeResume, OptimizeResumeRequest } from '@/lib/ai-service';
import { auth } from '@/lib/auth';
import { deductCredits, CreditError } from '@/lib/credit-service';

// 关闭默认的 body 解析，以便处理流式响应
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // 或 'edge' 如果使用 Edge Runtime

/**
 * POST 请求处理函数
 * 
 * 接收 JSON 格式的请求体，包含 resume 和 jobDescription 字段
 * 返回流式响应的优化建议
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
          message: '请先登录后再使用优化服务'
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const isDeveloperMode = request.headers.get('X-Developer-Mode') === 'true';
    
    // 解析请求体
    const body: OptimizeResumeRequest = await request.json();
    
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

    console.log('简历优化API请求:', {
      userId,
      resumeLength: body.resume.length,
      jobDescriptionLength: body.jobDescription.length,
    });

    // 扣减优化次数
    let creditResult;
    
    if (isDeveloperMode) {
      // 开发者模式：跳过次数检查，返回模拟的成功结果
      creditResult = {
        success: true,
        remainingEvaluationCredits: 5000,
        remainingOptimizationCredits: 5000,
        message: '开发者模式，次数固定为5000'
      };
    } else {
      // 非开发者模式：正常扣减次数
      creditResult = await deductCredits(userId, 'optimize', 1);
      
      if (!creditResult.success) {
        return NextResponse.json(
          { 
            success: false,
            error: '次数不足',
            message: creditResult.message || '优化次数不足，请购买套餐或等待重置',
            remainingEvaluationCredits: creditResult.remainingEvaluationCredits,
            remainingOptimizationCredits: creditResult.remainingOptimizationCredits
          },
          { status: 403 }
        );
      }
    }

    // 获取流式响应
    const stream = await optimizeResume(body);

    // 创建 TransformStream 将 ReadableStream<string> 转换为 ReadableStream<Uint8Array>
    const encoder = new TextEncoder();
    const transformStream = new TransformStream({
      async transform(chunk: string, controller) {
        controller.enqueue(encoder.encode(chunk));
      }
    });

    // 返回流式响应，添加响应头包含剩余次数信息
    const response = new Response(
      stream.pipeThrough(transformStream),
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'Cache-Control': 'no-cache, no-transform',
          'X-Content-Type-Options': 'nosniff',
          'X-Remaining-Evaluation-Credits': creditResult.remainingEvaluationCredits.toString(),
          'X-Remaining-Optimization-Credits': creditResult.remainingOptimizationCredits.toString(),
        },
      }
    );

    return response;

  } catch (error) {
    console.error('简历优化 API 错误:', error);
    
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
    
    return NextResponse.json(
      { 
        error: '服务器内部错误',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}

/**
 * GET 请求处理函数 - 用于测试 API 是否可用
 */
export async function GET() {
  return NextResponse.json({
    message: '简历优化 API 已就绪',
    version: '1.0.0',
    status: '模拟模式',
    endpoints: {
      POST: '/api/optimize',
      description: '接收简历和职位描述，返回流式优化建议'
    }
  });
}

// 其他 HTTP 方法不支持
export async function PUT() {
  return NextResponse.json({ error: '方法不支持' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: '方法不支持' }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: '方法不支持' }, { status: 405 });
}