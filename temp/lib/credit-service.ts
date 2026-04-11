

// 用户次数接口
export interface UserCredits {
  userId: string;
  evaluationCredits: number;
  optimizationCredits: number;
  totalEvaluations: number;
  totalOptimizations: number;
}

// Better Auth API 用户数据结构
export interface BetterAuthUser {
  id: string;
  email: string;
  name?: string;
  username?: string;
  evaluation_credits?: number;
  optimization_credits?: number;
  total_evaluations?: number;
  total_optimizations?: number;
}

// Better Auth API 响应格式
export interface BetterAuthResponse<T = unknown> {
  data?: T;
  id?: string;
}

// 次数操作结果接口
export interface CreditOperationResult {
  success: boolean;
  remainingEvaluationCredits: number;
  remainingOptimizationCredits: number;
  message?: string;
  error?: string;
}

// 次数操作类型
export type CreditOperation = 'evaluate' | 'optimize';

// 错误类型
export class CreditError extends Error {
  constructor(
    message: string,
    public code: 'INSUFFICIENT_CREDITS' | 'USER_NOT_FOUND' | 'DATABASE_ERROR' | 'INVALID_OPERATION'
  ) {
    super(message);
    this.name = 'CreditError';
  }
}

/**
 * 调用Better Auth Admin API，包含重试、超时和错误处理
 */
async function callBetterAuthApi<T = unknown>(
  endpoint: string,
  options: RequestInit,
  maxRetries: number = 3
): Promise<T> {
  const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
  const url = `${baseUrl}${endpoint}`;
  
  const timeout = 10000; // 10秒超时
  const retryDelay = 1000; // 重试延迟1秒
  
  // 添加管理员API密钥到请求头
  const headers = {
    "Content-Type": "application/json",
    "x-admin-api-key": process.env.ADMIN_API_KEY || "",
    ...options.headers,
  };
  
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // 创建带有超时的AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const fetchOptions: RequestInit = {
        ...options,
        headers,
        signal: controller.signal,
      };
      
      console.log(`Better Auth API调用 [${attempt}/${maxRetries}]: ${options.method || 'GET'} ${url}`);
      
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // 根据状态码确定错误类型
        let errorCode: 'USER_NOT_FOUND' | 'INVALID_OPERATION' | 'DATABASE_ERROR' = 'DATABASE_ERROR';
        if (response.status === 404) {
          errorCode = 'USER_NOT_FOUND';
        } else if (response.status === 400) {
          errorCode = 'INVALID_OPERATION';
        }
        
        // 如果是404或400错误，不重试，直接抛出CreditError
        if (response.status === 404 || response.status === 400) {
          throw new CreditError(`Better Auth API错误 ${response.status}: ${response.statusText}`, errorCode);
        }
        
        // 服务器错误（5xx）或网络错误进行重试
        if (attempt < maxRetries) {
          console.warn(`Better Auth API调用失败 [${attempt}/${maxRetries}]: ${response.status} ${response.statusText}`);
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          continue;
        }
        
        throw new CreditError(`Better Auth API调用失败: ${response.status} ${response.statusText}`, errorCode);
      }
      
      const data = await response.json();
      console.log(`Better Auth API调用成功: ${options.method || 'GET'} ${url}`);
      return data;
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // 如果是AbortError（超时），记录并重试
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.warn(`Better Auth API调用超时 [${attempt}/${maxRetries}]: ${url}`);
      } else {
        console.error(`Better Auth API调用错误 [${attempt}/${maxRetries}]:`, error);
      }
      
      // 最后一次尝试，抛出错误
      if (attempt === maxRetries) {
        throw new CreditError(
          `Better Auth API调用失败: ${lastError.message}`,
          'DATABASE_ERROR'
        );
      }
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
    }
  }
  
  // 理论上不会到达这里，但为了类型安全
  throw new CreditError(
    `Better Auth API调用失败: ${lastError?.message || '未知错误'}`,
    'DATABASE_ERROR'
  );
}

/**
 * 获取用户剩余次数
 */
export async function getUserCredits(userId: string): Promise<UserCredits> {
  try {
    // 通过Better Auth Admin API获取用户数据（使用包装函数）
    const result = await callBetterAuthApi<BetterAuthResponse<BetterAuthUser>>(`/admin/get-user?id=${userId}`, {
      method: "GET",
    });
    const user = result.data;

    if (!user) {
      throw new CreditError(`用户 ${userId} 不存在`, 'USER_NOT_FOUND');
    }

    return {
      userId,
      evaluationCredits: user.evaluation_credits || 0,
      optimizationCredits: user.optimization_credits || 0,
      totalEvaluations: user.total_evaluations || 0,
      totalOptimizations: user.total_optimizations || 0,
    };
  } catch (error) {
    if (error instanceof CreditError) {
      throw error;
    }
    throw new CreditError(
      `获取用户次数失败: ${error instanceof Error ? error.message : '未知错误'}`,
      'DATABASE_ERROR'
    );
  }
}

/**
 * 验证用户是否有足够次数
 */
export async function validateUserCredits(
  userId: string, 
  operation: CreditOperation, 
  requiredCredits: number = 1
): Promise<boolean> {
  try {
    const credits = await getUserCredits(userId);
    
    switch (operation) {
      case 'evaluate':
        return credits.evaluationCredits >= requiredCredits;
      case 'optimize':
        return credits.optimizationCredits >= requiredCredits;
      default:
        throw new CreditError(`无效的操作类型: ${operation}`, 'INVALID_OPERATION');
    }
  } catch (error) {
    if (error instanceof CreditError) {
      throw error;
    }
    throw new CreditError(
      `验证用户次数失败: ${error instanceof Error ? error.message : '未知错误'}`,
      'DATABASE_ERROR'
    );
  }
}

/**
 * 扣减用户次数（原子操作）
 */
export async function deductCredits(
  userId: string, 
  operation: CreditOperation, 
  creditsToDeduct: number = 1
): Promise<CreditOperationResult> {
  try {
    // 首先验证用户是否存在并有足够次数
    const hasEnoughCredits = await validateUserCredits(userId, operation, creditsToDeduct);
    
    if (!hasEnoughCredits) {
      const currentCredits = await getUserCredits(userId);
      throw new CreditError(
        `次数不足，需要 ${creditsToDeduct} 次${operation === 'evaluate' ? '评估' : '优化'}，剩余 ${operation === 'evaluate' ? currentCredits.evaluationCredits : currentCredits.optimizationCredits} 次`,
        'INSUFFICIENT_CREDITS'
      );
    }

    // 执行扣减操作
    // 注意：这里需要原子操作，实际应使用数据库事务
    // 使用Better Auth Admin API更新用户数据
    const updateData: Record<string, unknown> = {};
    
    if (operation === 'evaluate') {
      updateData.evaluation_credits = { decrement: creditsToDeduct };
      updateData.total_evaluations = { increment: creditsToDeduct };
    } else {
      updateData.optimization_credits = { decrement: creditsToDeduct };
      updateData.total_optimizations = { increment: creditsToDeduct };
    }

    // 通过Better Auth Admin API更新用户数据（使用包装函数）
    const updateResult = await callBetterAuthApi<{ id?: string }>('/admin/update-user', {
      method: "POST",
      body: JSON.stringify({
        userId,
        data: updateData,
      }),
    });

    if (!updateResult || !updateResult.id) {
      throw new CreditError(`更新用户次数失败`, 'DATABASE_ERROR');
    }

    // 获取更新后的用户数据以确认（使用包装函数）
    let updatedUser = null;
    try {
      const getUserResult = await callBetterAuthApi<BetterAuthResponse<BetterAuthUser>>(`/admin/get-user?id=${userId}`, {
        method: "GET",
      });
      updatedUser = getUserResult.data;
    } catch (error) {
      // 如果获取更新后的用户失败，仍返回成功但使用默认值
      console.warn(`获取更新后的用户数据失败:`, error);
      return {
        success: true,
        remainingEvaluationCredits: 0,
        remainingOptimizationCredits: 0,
        message: `成功扣减 ${creditsToDeduct} 次${operation === 'evaluate' ? '评估' : '优化'}次数`,
      };
    }

    return {
      success: true,
      remainingEvaluationCredits: updatedUser?.evaluation_credits || 0,
      remainingOptimizationCredits: updatedUser?.optimization_credits || 0,
      message: `成功扣减 ${creditsToDeduct} 次${operation === 'evaluate' ? '评估' : '优化'}次数`,
    };
  } catch (error) {
    if (error instanceof CreditError) {
      return {
        success: false,
        remainingEvaluationCredits: 0,
        remainingOptimizationCredits: 0,
        error: error.message,
        message: error.message,
      };
    }
    
    return {
      success: false,
      remainingEvaluationCredits: 0,
      remainingOptimizationCredits: 0,
      error: `扣减次数失败: ${error instanceof Error ? error.message : '未知错误'}`,
      message: '系统错误，请稍后重试',
    };
  }
}

/**
 * 添加用户次数（管理员功能）
 */
export async function addCredits(
  userId: string,
  evaluationCredits: number = 0,
  optimizationCredits: number = 0
): Promise<CreditOperationResult> {
  try {
    if (evaluationCredits < 0 || optimizationCredits < 0) {
      throw new CreditError('添加次数不能为负数', 'INVALID_OPERATION');
    }

    // 验证用户存在（使用包装函数）
    const getUserResult = await callBetterAuthApi<BetterAuthResponse<BetterAuthUser>>(`/admin/get-user?id=${userId}`, {
      method: "GET",
    });
    if (!getUserResult.data) {
      throw new CreditError(`用户 ${userId} 不存在`, 'USER_NOT_FOUND');
    }

    const updateData: Record<string, unknown> = {};
    
    if (evaluationCredits > 0) {
      updateData.evaluation_credits = { increment: evaluationCredits };
    }
    
    if (optimizationCredits > 0) {
      updateData.optimization_credits = { increment: optimizationCredits };
    }
    // 更新用户数据（使用包装函数）
    const updateResult = await callBetterAuthApi<{ id?: string }>('/admin/update-user', {
      method: "POST",
      body: JSON.stringify({
        userId,
        data: updateData,
      }),
    });

    if (!updateResult || !updateResult.id) {
      throw new CreditError(`更新用户次数失败`, 'DATABASE_ERROR');
    }

    // 获取更新后的用户数据（使用包装函数）
    let updatedUser = null;
    try {
      const updatedUserResult = await callBetterAuthApi<BetterAuthResponse<BetterAuthUser>>(`/admin/get-user?id=${userId}`, {
        method: "GET",
      });
      updatedUser = updatedUserResult.data;
    } catch (error) {
      // 如果获取更新后的用户失败，继续使用null值
      console.warn(`获取更新后的用户数据失败:`, error);
    }

    return {
      success: true,
      remainingEvaluationCredits: updatedUser?.evaluation_credits || 0,
      remainingOptimizationCredits: updatedUser?.optimization_credits || 0,
      message: `成功添加 ${evaluationCredits} 次评估次数和 ${optimizationCredits} 次优化次数`,
    };
  } catch (error) {
    if (error instanceof CreditError) {
      return {
        success: false,
        remainingEvaluationCredits: 0,
        remainingOptimizationCredits: 0,
        error: error.message,
        message: error.message,
      };
    }
    
    return {
      success: false,
      remainingEvaluationCredits: 0,
      remainingOptimizationCredits: 0,
      error: `添加次数失败: ${error instanceof Error ? error.message : '未知错误'}`,
      message: '系统错误，请稍后重试',
    };
  }
}

/**
 * 重置用户次数（管理员功能）
 */
export async function resetCredits(
  userId: string,
  evaluationCredits: number = parseInt(process.env.DEFAULT_EVAL_CREDITS || '3'),
  optimizationCredits: number = parseInt(process.env.DEFAULT_OPT_CREDITS || '0')
): Promise<CreditOperationResult> {
  try {
    if (evaluationCredits < 0 || optimizationCredits < 0) {
      throw new CreditError('重置次数不能为负数', 'INVALID_OPERATION');
    }

    // 验证用户存在（使用包装函数）
    const getUserResult = await callBetterAuthApi<BetterAuthResponse<BetterAuthUser>>(`/admin/get-user?id=${userId}`, {
      method: "GET",
    });
    if (!getUserResult.data) {
      throw new CreditError(`用户 ${userId} 不存在`, 'USER_NOT_FOUND');
    }

    // 重置用户次数（使用包装函数）
    const updateResult = await callBetterAuthApi<{ id?: string }>('/admin/update-user', {
      method: "POST",
      body: JSON.stringify({
        userId,
        data: {
          evaluation_credits: evaluationCredits,
          optimization_credits: optimizationCredits,
          // 保留统计字段不变
        },
      }),
    });

    if (!updateResult || !updateResult.id) {
      throw new CreditError(`重置用户次数失败`, 'DATABASE_ERROR');
    }

    // 获取更新后的用户数据（使用包装函数）
    let updatedUser = null;
    try {
      const updatedUserResult = await callBetterAuthApi<BetterAuthResponse<BetterAuthUser>>(`/admin/get-user?id=${userId}`, {
        method: "GET",
      });
      updatedUser = updatedUserResult.data;
    } catch (error) {
      // 如果获取更新后的用户失败，继续使用null值
      console.warn(`获取更新后的用户数据失败:`, error);
    }

    return {
      success: true,
      remainingEvaluationCredits: updatedUser?.evaluation_credits || 0,
      remainingOptimizationCredits: updatedUser?.optimization_credits || 0,
      message: `成功重置为 ${evaluationCredits} 次评估次数和 ${optimizationCredits} 次优化次数`,
    };
  } catch (error) {
    if (error instanceof CreditError) {
      return {
        success: false,
        remainingEvaluationCredits: 0,
        remainingOptimizationCredits: 0,
        error: error.message,
        message: error.message,
      };
    }
    
    return {
      success: false,
      remainingEvaluationCredits: 0,
      remainingOptimizationCredits: 0,
      error: `重置次数失败: ${error instanceof Error ? error.message : '未知错误'}`,
      message: '系统错误，请稍后重试',
    };
  }
}

/**
 * 批量获取用户次数（管理员功能）
 */
export async function getUsersCredits(userIds: string[]): Promise<Record<string, UserCredits>> {
  try {
    const results: Record<string, UserCredits> = {};
    
    // 批量查询用户数据
    // 简化实现，实际应使用批量查询
    for (const userId of userIds) {
      try {
        const credits = await getUserCredits(userId);
        results[userId] = credits;
      } catch (error) {
        // 跳过错误用户
        console.error(`获取用户 ${userId} 次数失败:`, error);
      }
    }
    
    return results;
  } catch (error) {
    throw new CreditError(
      `批量获取用户次数失败: ${error instanceof Error ? error.message : '未知错误'}`,
      'DATABASE_ERROR'
    );
  }
}

// 导出工具函数
export const creditService = {
  getUserCredits,
  validateUserCredits,
  deductCredits,
  addCredits,
  resetCredits,
  getUsersCredits,
};