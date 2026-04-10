import { createAuthClient } from "better-auth/react";
import { username } from "better-auth/plugins";
import { useState, useCallback } from "react";

// 创建认证客户端
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [username()],
});

// 导出 useSession 钩子
export const useSession = authClient.useSession;

// 导出方法
export const signIn = authClient.signIn.email;
export const signUp = authClient.signUp.email;
export const signOut = authClient.signOut;

// 类型定义
export type AuthClient = typeof authClient;
export type Session = ReturnType<typeof useSession>["data"];
export type User = Session extends { user: infer U } ? U : never;

// 自定义 useAuth 钩子
export function useAuth() {
  const { data: session, isPending, error } = useSession();
  
  // 过滤网络中止错误，减少控制台噪音
  const filteredError = (() => {
    if (!error) return null;
    
    const errorMessage = error.message?.toLowerCase() || '';
    const errorString = error.toString().toLowerCase();
    
    // 检查是否是网络中止/取消错误
    const isNetworkAbortError = 
      errorMessage.includes('aborted') ||
      errorMessage.includes('canceled') ||
      errorMessage.includes('cancelled') ||
      errorMessage.includes('network error') ||
      errorMessage.includes('fetch failed') ||
      errorString.includes('aborted') ||
      errorString.includes('canceled') ||
      errorString.includes('cancelled') ||
      errorString.includes('network error') ||
      errorString.includes('typeerror: failed to fetch');
    
    // 如果是网络中止错误，静默处理
    // 保留真正的认证错误（如401未授权、403禁止访问等）
    return isNetworkAbortError ? null : error;
  })();
  
  return {
    user: session?.user,
    session,
    isLoading: isPending,
    error: filteredError,
    isAuthenticated: !!session?.user,
    signIn: authClient.signIn.email,
    signUp: authClient.signUp.email,
    signOut: authClient.signOut,
  };
}

// React Query 风格的钩子
export function useSignIn() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (
      credentials: { email: string; password: string },
      options?: {
        onSuccess?: (data: unknown) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      setIsPending(true);
      setError(null);
      try {
        const result = await authClient.signIn.email(credentials);
        if (result.error) {
          throw new Error(result.error.message || '登录失败');
        }
        options?.onSuccess?.(result.data);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('登录失败');
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return { mutate, isPending, error };
}

export function useSignUp() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (
      credentials: { email: string; password: string; name: string; username?: string },
      options?: {
        onSuccess?: (data: unknown) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      setIsPending(true);
      setError(null);
      try {
        const result = await authClient.signUp.email(credentials);
        if (result.error) {
          throw new Error(result.error.message || '注册失败');
        }
        options?.onSuccess?.(result.data);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('注册失败');
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return { mutate, isPending, error };
}