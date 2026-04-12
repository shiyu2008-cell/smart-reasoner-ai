/**
 * 兑换码 API 路由
 * 
 * 提供兑换码验证和奖励发放服务，支持预设兑换码和奖励次数管理。
 * 兑换码使用规则：
 * - 每个用户对同一个兑换码只能使用一次
 * - 兑换码可兑换不同类型的奖励（次数或礼包）
 * - 兑换码获得的奖励不计入常规限购次数
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from '@/lib/auth'
import { creditService } from '@/lib/credit-service'

// 兑换码数据接口
interface RedeemRequest {
  code: string;
}

interface RedeemResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    evaluationAdded: number;
    optimizationAdded: number;
    code: string;
    rewardType: string;
    remainingEvaluationCredits?: number;
    remainingOptimizationCredits?: number;
  };
}

// 预设兑换码配置
const VALID_CODES: Record<string, { evaluation: number; optimization: number; description: string }> = {
  "万柏666": {
    evaluation: 3,
    optimization: 3,
    description: "新人福利兑换码，可获得3次评估和3次优化机会"
  },
  // 可以添加更多兑换码
};

// 内存存储兑换记录（生产环境应使用数据库）
const memoryRedeemRecords = new Map<string, Set<string>>(); // userId -> Set<code>

// API需要动态处理
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST 请求处理函数 - 兑换码验证和奖励发放
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
          message: '请先登录后再使用兑换码功能'
        } as RedeemResponse,
        { status: 401 }
      );
    }

    const userId = session.user.id;
    
    // 解析请求体
    const body: RedeemRequest = await request.json();
    
    // 验证必要字段
    if (!body.code || typeof body.code !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: '兑换码不能为空',
          message: '请输入有效的兑换码'
        } as RedeemResponse,
        { status: 400 }
      );
    }

    const code = body.code.trim();
    
    console.log('兑换码API请求:', { userId, code });

    // 检查兑换码格式
    if (code.length < 4 || code.length > 50) {
      return NextResponse.json(
        { 
          success: false,
          error: '兑换码格式无效',
          message: '兑换码长度应在4-50个字符之间'
        } as RedeemResponse,
        { status: 400 }
      );
    }

    // 检查兑换码是否有效
    const validCode = VALID_CODES[code];
    if (!validCode) {
      return NextResponse.json(
        { 
          success: false,
          error: '兑换码无效或已过期',
          message: '您输入的兑换码不存在或已过期，请检查后重试'
        } as RedeemResponse,
        { status: 404 }
      );
    }

    // 检查兑换码是否已被当前用户使用（使用内存存储）
    const userRedeemedCodes = memoryRedeemRecords.get(userId) || new Set<string>();
    const hasRedeemed = userRedeemedCodes.has(code);
    if (hasRedeemed) {
      return NextResponse.json(
        { 
          success: false,
          error: '兑换码已使用',
          message: '您已使用过此兑换码，每个用户只能使用一次'
        } as RedeemResponse,
        { status: 409 }
      );
    }

    // 调用次数服务添加次数
    const creditResult = await creditService.addCredits(
      userId,
      validCode.evaluation,
      validCode.optimization
    );
    
    if (!creditResult.success) {
      return NextResponse.json(
        { 
          success: false,
          error: '次数添加失败',
          message: creditResult.message || '添加次数时发生错误，请稍后重试'
        } as RedeemResponse,
        { status: 500 }
      );
    }
    
    // 创建兑换记录（更新内存存储）
    const updatedUserRedeemedCodes = memoryRedeemRecords.get(userId) || new Set<string>();
    updatedUserRedeemedCodes.add(code);
    memoryRedeemRecords.set(userId, updatedUserRedeemedCodes);
    
    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '兑换成功！已为您添加使用次数',
      data: {
        evaluationAdded: validCode.evaluation,
        optimizationAdded: validCode.optimization,
        code: code,
        rewardType: '次数礼包',
        description: validCode.description,
        remainingEvaluationCredits: creditResult.remainingEvaluationCredits,
        remainingOptimizationCredits: creditResult.remainingOptimizationCredits
      },
      timestamp: new Date().toISOString()
    } as RedeemResponse);

  } catch (error) {
    console.error('兑换码 API 错误:', error);
    
    // 根据错误类型返回适当的错误响应
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    const isJsonError = errorMessage.includes('JSON') || errorMessage.includes('Unexpected token');
    
    return NextResponse.json(
      { 
        success: false,
        error: '兑换服务暂时不可用',
        message: isJsonError ? '请求格式错误，请检查输入' : '服务器内部错误，请稍后重试',
        details: errorMessage,
        timestamp: new Date().toISOString()
      } as RedeemResponse,
      { status: isJsonError ? 400 : 500 }
    );
  }
}

/**
 * GET 请求处理函数 - 用于测试 API 是否可用
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: '兑换码 API 已就绪',
    version: '1.0.0',
    status: '运行中',
    endpoints: {
      POST: '/api/redeem',
      description: '兑换码验证和奖励发放',
      requestFormat: {
        code: 'string (兑换码)'
      },
      responseFormat: {
        success: 'boolean',
        message: 'string',
        data: {
          evaluationAdded: 'number',
          optimizationAdded: 'number',
          code: 'string',
          rewardType: 'string',
          description: 'string',
          remainingEvaluationCredits: 'number (optional)',
          remainingOptimizationCredits: 'number (optional)'
        },
        timestamp: 'string'
      }
    },
    features: [
      '兑换码验证',
      '奖励次数发放',
      '使用次数限制',
      '错误友好提示'
    ],
    note: '兑换码功能已集成用户认证、次数服务和兑换记录管理，支持数据库持久化存储'
  });
}

// 其他 HTTP 方法不支持
export async function PUT() {
  return NextResponse.json({ 
    success: false,
    error: '方法不支持',
    allowedMethods: ['GET', 'POST']
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ 
    success: false,
    error: '方法不支持',
    allowedMethods: ['GET', 'POST']
  }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ 
    success: false,
    error: '方法不支持', 
    allowedMethods: ['GET', 'POST']
  }, { status: 405 });
}