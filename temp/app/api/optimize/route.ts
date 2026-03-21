/**
 * 简历优化 API 路由
 * 
 * 提供流式响应的简历优化服务，接收简历和职位描述，返回 AI 生成的优化建议。
 * 当前为模拟实现，后续可接入真实 AI 模型（如 OpenAI、DeepSeek）。
 */

import { NextRequest, NextResponse } from 'next/server';
import { optimizeResume, OptimizeResumeRequest } from '@/lib/ai-service';

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
    // 解析请求体
    const body: OptimizeResumeRequest = await request.json();
    
    // 验证必要字段
    if (!body.resume || !body.jobDescription) {
      return NextResponse.json(
        { error: '缺少必要字段：resume 和 jobDescription 不能为空' },
        { status: 400 }
      );
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

    // 返回流式响应
    return new Response(
      stream.pipeThrough(transformStream),
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'Cache-Control': 'no-cache, no-transform',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );

  } catch (error) {
    console.error('简历优化 API 错误:', error);
    
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