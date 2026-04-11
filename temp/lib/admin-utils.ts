import { NextRequest } from "next/server";

/**
 * 验证管理员访问权限
 * 检查IP白名单和API密钥
 */
export function validateAdminAccess(request: NextRequest): { success: boolean; message?: string } {
  // 检查IP白名单
  const clientIp = request.headers.get("x-forwarded-for") || 
                   request.headers.get("x-real-ip") || 
                   "127.0.0.1";
  const ipWhitelist = process.env.ADMIN_IP_WHITELIST?.split(",").map(ip => ip.trim()) || [];
  
  if (!ipWhitelist.includes(clientIp) && !ipWhitelist.includes("127.0.0.1")) {
    return { 
      success: false, 
      message: `IP地址 ${clientIp} 未授权访问管理接口` 
    };
  }

  // 检查API密钥
  const apiKey = request.headers.get("x-admin-api-key");
  const validApiKey = process.env.ADMIN_API_KEY;
  
  if (!apiKey || apiKey !== validApiKey) {
    return { 
      success: false, 
      message: "无效的管理API密钥" 
    };
  }

  return { success: true };
}

/**
 * 创建管理员API响应包装器
 */
export function createAdminApiResponse<T = unknown>(
  data: T,
  status: number = 200
) {
  return Response.json(data, { status });
}

/**
 * 创建管理员错误响应
 */
export function createAdminErrorResponse(
  message: string,
  status: number = 403
) {
  return Response.json(
    {
      success: false,
      error: "未授权访问",
      message
    },
    { status }
  );
}