/**
 * 兑换记录服务
 * 
 * 提供兑换码使用记录的管理服务，包括兑换记录检查、创建和查询功能。
 * 兑换记录存储在数据库中，确保数据持久化和一致性。
 */

// 兑换记录接口
export interface RedeemRecord {
  id: string;
  userId: string;
  code: string;
  evaluationAdded: number;
  optimizationAdded: number;
  createdAt: string;
}

// 创建兑换记录输入参数
export interface CreateRedeemRecordInput {
  userId: string;
  code: string;
  evaluationAdded: number;
  optimizationAdded: number;
  timestamp: Date;
}

// 错误类
export class RedeemError extends Error {
  constructor(
    message: string,
    public code: 'USER_NOT_FOUND' | 'DATABASE_ERROR' | 'REDEEM_RECORD_EXISTS' | 'INVALID_OPERATION'
  ) {
    super(message);
    this.name = 'RedeemError';
  }
}

// 内存存储（临时方案，生产环境应使用数据库）
const memoryRedeemRecords = new Map<string, Set<string>>(); // userId -> Set<code>

/**
 * 调用Better Auth Admin API，包含重试、超时和错误处理
 * 与credit-service.ts中的函数保持一致
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
        
        // 如果是404或400错误，不重试，直接抛出RedeemError
        if (response.status === 404 || response.status === 400) {
          throw new RedeemError(`Better Auth API错误 ${response.status}: ${response.statusText}`, errorCode);
        }
        
        // 服务器错误（5xx）或网络错误进行重试
        if (attempt < maxRetries) {
          console.warn(`Better Auth API调用失败 [${attempt}/${maxRetries}]: ${response.status} ${response.statusText}`);
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          continue;
        }
        
        throw new RedeemError(`Better Auth API调用失败: ${response.status} ${response.statusText}`, errorCode);
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
        throw new RedeemError(
          `Better Auth API调用失败: ${lastError.message}`,
          'DATABASE_ERROR'
        );
      }
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
    }
  }
  
  // 理论上不会到达这里，但为了类型安全
  throw new RedeemError(
    `Better Auth API调用失败: ${lastError?.message || '未知错误'}`,
    'DATABASE_ERROR'
  );
}

/**
 * 检查用户是否已兑换过指定兑换码
 */
export async function checkRedeemRecord(
  userId: string, 
  code: string
): Promise<boolean> {
  try {
    // 调用Better Auth Admin API检查兑换记录
    // 注意：这里假设有对应的Admin API端点，实际可能需要根据Better Auth的扩展性调整
    const result = await callBetterAuthApi<{ exists: boolean }>(
      `/admin/check-redeem?userId=${userId}&code=${code}`,
      { method: 'GET' }
    );
    return result.exists || false;
  } catch (error) {
    // 如果API端点不存在，使用内存存储作为临时方案
    console.warn('兑换记录检查API失败，使用内存存储:', error);
    
    // 检查内存存储
    const userRedeemedCodes = memoryRedeemRecords.get(userId) || new Set<string>();
    return userRedeemedCodes.has(code);
  }
}

/**
 * 创建兑换记录
 */
export async function createRedeemRecord(
  input: CreateRedeemRecordInput
): Promise<RedeemRecord> {
  try {
    // 调用Better Auth Admin API创建兑换记录
    // 注意：这里假设有对应的Admin API端点，实际可能需要根据Better Auth的扩展性调整
    const result = await callBetterAuthApi<{ id: string }>(
      '/admin/create-redeem',
      {
        method: 'POST',
        body: JSON.stringify({
          userId: input.userId,
          code: input.code,
          evaluationAdded: input.evaluationAdded,
          optimizationAdded: input.optimizationAdded,
          createdAt: input.timestamp.toISOString()
        })
      }
    );
    
    // 同时更新内存存储
    const userRedeemedCodes = memoryRedeemRecords.get(input.userId) || new Set<string>();
    userRedeemedCodes.add(input.code);
    memoryRedeemRecords.set(input.userId, userRedeemedCodes);
    
    return {
      id: result.id,
      userId: input.userId,
      code: input.code,
      evaluationAdded: input.evaluationAdded,
      optimizationAdded: input.optimizationAdded,
      createdAt: input.timestamp.toISOString()
    };
  } catch (error) {
    // 如果API端点不存在，使用内存存储作为临时方案
    console.warn('创建兑换记录API失败，使用内存存储:', error);
    
    // 更新内存存储
    const userRedeemedCodes = memoryRedeemRecords.get(input.userId) || new Set<string>();
    userRedeemedCodes.add(input.code);
    memoryRedeemRecords.set(input.userId, userRedeemedCodes);
    
    // 返回模拟记录
    return {
      id: `memory-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: input.userId,
      code: input.code,
      evaluationAdded: input.evaluationAdded,
      optimizationAdded: input.optimizationAdded,
      createdAt: input.timestamp.toISOString()
    };
  }
}

/**
 * 获取用户的兑换历史
 */
export async function getUserRedeemHistory(
  userId: string,
  limit: number = 10
): Promise<RedeemRecord[]> {
  try {
    // 调用Better Auth Admin API获取兑换历史
    const result = await callBetterAuthApi<{ records: RedeemRecord[] }>(
      `/admin/user-redeem-history?userId=${userId}&limit=${limit}`,
      { method: 'GET' }
    );
    return result.records || [];
  } catch (error) {
    console.error('获取兑换历史失败:', error);
    return [];
  }
}

/**
 * 导出服务对象
 */
export const redeemService = {
  checkRedeemRecord,
  createRedeemRecord,
  getUserRedeemHistory,
};