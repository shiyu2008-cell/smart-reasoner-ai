import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 安全工具函数 - 用于处理开发者代码验证
 */

/**
 * 使用SHA-256哈希字符串
 * @param text 要哈希的文本
 * @returns 十六进制哈希字符串
 */
export async function sha256(text: string): Promise<string> {
  // 在浏览器环境中使用Web Crypto API
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  // 在Node.js环境中（服务器端）
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  // 如果都不支持，返回一个简单的替代方案（仅用于开发）
  console.warn('Crypto API not available, using simple hash fallback');
  return `fallback-hash-${text.length}`;
}

/**
 * 验证开发者代码
 * @param inputCode 用户输入的代码
 * @param expectedHash 预期的哈希值（从环境变量获取）
 * @returns 是否验证通过
 */
export async function validateDeveloperCode(inputCode: string, expectedHash?: string): Promise<boolean> {
  if (!expectedHash) {
    console.warn('Developer code hash not configured');
    return false;
  }
  
  try {
    const inputHash = await sha256(inputCode.trim());
    return inputHash === expectedHash;
  } catch (error) {
    console.error('Error validating developer code:', error);
    return false;
  }
}

/**
 * 安全比较两个字符串（恒定时间比较，防止时序攻击）
 * @param a 字符串A
 * @param b 字符串B
 * @returns 是否相等
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}