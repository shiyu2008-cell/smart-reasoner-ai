/**
 * DeepSeek API 测试脚本
 * 用于验证API连接和基本功能
 */

import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { readFileSync } from 'fs';
import { join } from 'path';

// 从 .env.local 文件加载环境变量
function loadEnv() {
  try {
    const envPath = join(process.cwd(), '.env.local');
    const content = readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        // 移除可能的引号
        const cleanValue = value.replace(/^['"]|['"]$/g, '');
        process.env[key] = cleanValue;
      }
    }
    console.log('✅ 已从 .env.local 加载环境变量');
  } catch (error) {
    console.warn('⚠️  无法加载 .env.local 文件:', error.message);
  }
}

// 加载环境变量
loadEnv();

const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
  console.error('错误: DEEPSEEK_API_KEY 环境变量未设置');
  console.error('请在 .env.local 文件中设置 DEEPSEEK_API_KEY');
  console.error('当前工作目录:', process.cwd());
  console.error('环境变量列表:', Object.keys(process.env).filter(k => k.includes('DEEPSEEK') || k.includes('API')).join(', '));
  process.exit(1);
}

console.log('🔍 DeepSeek API 测试开始');
console.log('API密钥前缀:', apiKey.substring(0, 12) + '...');

const deepseek = createOpenAI({
  apiKey,
  baseURL: 'https://api.deepseek.com/v1', // OpenAI兼容端点 (v1路径)
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  compatibility: 'strict', // 强制使用Chat Completions API
});

async function testBasic() {
  console.log('\n📋 测试1: 基础问候');
  try {
    const stream = await streamText({
      model: deepseek('deepseek-chat', { mode: 'chat' }),
      prompt: '请说"测试成功"',
      temperature: 0.7,
      maxTokens: 50,
    });
    
    let fullResponse = '';
    for await (const chunk of stream.textStream) {
      process.stdout.write(chunk);
      fullResponse += chunk;
    }
    
    console.log('\n✅ 测试1通过 - 收到响应:', fullResponse.trim());
    return true;
  } catch (error) {
    console.error('❌ 测试1失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
    return false;
  }
}

async function testResumeOptimization() {
  console.log('\n📋 测试2: 简单简历优化');
  try {
    const mockResume = `张三
前端开发工程师
3年React经验，熟悉TypeScript`;
    
    const mockJobDescription = `前端开发工程师职位
要求：5年React经验，精通TypeScript和Next.js`;
    
    const stream = await streamText({
      model: deepseek('deepseek-chat', { mode: 'chat' }),
      system: '你是一个简历优化助手，请提供简短的优化建议。',
      prompt: `请为以下简历提供优化建议以匹配职位描述：
      
简历：
${mockResume}

职位描述：
${mockJobDescription}`,
      temperature: 0.7,
      maxTokens: 200,
    });
    
    console.log('收到优化建议:');
    for await (const chunk of stream.textStream) {
      process.stdout.write(chunk);
    }
    
    console.log('\n✅ 测试2通过 - 收到优化建议');
    return true;
  } catch (error) {
    console.error('❌ 测试2失败:', error.message);
    return false;
  }
}

async function testDirectAPI() {
  console.log('\n📋 测试3: 直接API调用（非流式）');
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: '简单测试，请回复"API连接正常"' }],
        max_tokens: 20,
        stream: false
      })
    });

    console.log('API响应状态:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${response.statusText}\n${errorText}`);
    }

    const result = await response.json();
    console.log('API响应结构:', Object.keys(result));
    
    const content = result.choices?.[0]?.message?.content;
    if (content && content.trim().length > 0) {
      console.log('✅ 测试3通过 - API连接正常，内容:', content.trim());
      return true;
    } else {
      console.error('❌ 测试3失败 - 响应内容为空');
      console.error('完整响应:', JSON.stringify(result, null, 2));
      return false;
    }
  } catch (error) {
    console.error('❌ 测试3失败:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 开始DeepSeek API测试套件');
  console.log('=' .repeat(50));
  
  const results = [];
  
  // 先测试直接API连接
  results.push(await testDirectAPI());
  
  // 如果直接API测试通过，再测试流式功能
  if (results[0]) {
    results.push(await testBasic());
    results.push(await testResumeOptimization());
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('📊 测试结果汇总:');
  console.log(`测试1 (直接API): ${results[0] ? '✅ 通过' : '❌ 失败'}`);
  if (results.length > 1) {
    console.log(`测试2 (基础问候): ${results[1] ? '✅ 通过' : '❌ 失败'}`);
    console.log(`测试3 (简历优化): ${results[2] ? '✅ 通过' : '❌ 失败'}`);
  }
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  console.log(`\n🎯 通过率: ${passed}/${total} (${Math.round(passed/total*100)}%)`);
  
  if (passed === total) {
    console.log('🎉 所有测试通过！DeepSeek API配置正确。');
    process.exit(0);
  } else {
    console.log('⚠️  部分测试失败，请检查配置和错误信息。');
    process.exit(1);
  }
}

// 运行测试
runAllTests().catch(error => {
  console.error('测试执行失败:', error);
  process.exit(1);
});