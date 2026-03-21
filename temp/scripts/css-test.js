#!/usr/bin/env node

/**
 * CSS测试套件
 * 运行stylelint检查并生成兼容性报告
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

// 配置
const CONFIG = {
  cssFiles: ['app/**/*.css', 'app/**/*.module.css'],
  stylelintConfig: '.stylelintrc.json',
  outputFile: 'css-test-report.md'
};

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = colors.reset) {
  console.log(color + message + colors.reset);
}

function logError(message) {
  console.error(colors.red + '✗ ' + message + colors.reset);
}

function logSuccess(message) {
  console.log(colors.green + '✓ ' + message + colors.reset);
}

function logWarning(message) {
  console.log(colors.yellow + '⚠ ' + message + colors.reset);
}

function runStyleLint() {
  try {
    log('运行stylelint检查...', colors.blue);
    
    const command = `npx stylelint "${CONFIG.cssFiles.join('" "')}" --config ${CONFIG.stylelintConfig} --formatter verbose`;
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    
    logSuccess('stylelint检查通过！');
    return { success: true, output };
  } catch (error) {
    logError('stylelint检查失败：');
    console.log(error.stdout || error.message);
    return { success: false, output: error.stdout || error.message };
  }
}

function checkBrowserCompatibility() {
  log('检查CSS浏览器兼容性...', colors.blue);
  
  // 读取主要的CSS文件
  const cssFiles = [];
  
  CONFIG.cssFiles.forEach(() => {
    const files = fs.readdirSync('app', { recursive: true }).filter(file => 
      file.endsWith('.css') || file.endsWith('.module.css')
    );
    cssFiles.push(...files.map(file => path.join('app', file)));
  });
  
  // 检查常见的兼容性问题
  const compatibilityIssues = [];
  
  cssFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      
      // 检查现代CSS特性
      const modernFeatures = [
        { pattern: /oklch\(/g, feature: 'oklch()颜色函数', support: 'Chrome 111+, Safari 15.4+' },
        { pattern: /color-mix\(/g, feature: 'color-mix()函数', support: 'Chrome 111+, Safari 16.2+' },
        { pattern: /@custom-variant/g, feature: "自定义变体", support: "实验性特性" },
        { pattern: /text-wrap:\s*balance/g, feature: 'text-wrap: balance', support: 'Chrome 114+, Safari TP' },
        { pattern: /font-feature-settings/g, feature: '字体特性设置', support: '广泛支持但有差异' }
      ];
      
      modernFeatures.forEach(({ pattern, feature, support }) => {
        const matches = content.match(pattern);
        if (matches) {
          compatibilityIssues.push({
            file,
            feature,
            count: matches.length,
            support,
            severity: 'warning'
          });
        }
      });
    } catch {
      // 文件可能不存在，忽略
    }
  });
  
  return compatibilityIssues;
}

function generateReport(stylelintResult, compatibilityIssues) {
  const timestamp = new Date().toISOString();
  const reportContent = `# CSS测试报告
生成时间: ${timestamp}

## 1. Stylelint检查
${stylelintResult.success ? '✅ 通过' : '❌ 失败'}

${stylelintResult.success ? '所有CSS文件符合代码规范。' : '发现以下问题：\n```\n' + stylelintResult.output + '\n```'}

## 2. 浏览器兼容性检查
${compatibilityIssues.length === 0 ? '✅ 未发现重大兼容性问题' : `⚠ 发现${compatibilityIssues.length}个潜在兼容性问题：`}

${compatibilityIssues.map(issue => `
### ${path.basename(issue.file)}
- **特性**: ${issue.feature}
- **使用次数**: ${issue.count}
- **浏览器支持**: ${issue.support}
- **严重程度**: ${issue.severity}
`).join('')}

## 3. 建议
${compatibilityIssues.length > 0 ? 
  '1. 考虑为现代CSS特性添加回退方案\n2. 使用@supports规则进行特性检测\n3. 定期检查浏览器支持情况' : 
  '所有CSS代码质量良好，继续保持！'}

---

*报告由CSS测试套件生成*
`;

  fs.writeFileSync(CONFIG.outputFile, reportContent);
  logSuccess(`测试报告已生成: ${CONFIG.outputFile}`);
}

function main() {
  log('🚀 开始CSS测试套件', colors.blue);
  log('=' .repeat(50));
  
  // 检查stylelint配置
  if (!fs.existsSync(CONFIG.stylelintConfig)) {
    logError(`找不到stylelint配置文件: ${CONFIG.stylelintConfig}`);
    process.exit(1);
  }
  
  // 运行stylelint
  const stylelintResult = runStyleLint();
  
  // 检查浏览器兼容性
  const compatibilityIssues = checkBrowserCompatibility();
  
  // 生成报告
  generateReport(stylelintResult, compatibilityIssues);
  
  // 总结
  log('=' .repeat(50));
  log('📊 测试总结', colors.blue);
  log(`Stylelint检查: ${stylelintResult.success ? '✅ 通过' : '❌ 失败'}`);
  log(`兼容性问题: ${compatibilityIssues.length}个`);
  
  if (!stylelintResult.success || compatibilityIssues.length > 0) {
    logWarning('发现了一些问题，请查看详细报告。');
    process.exit(1);
  }
  
  logSuccess('所有测试通过！CSS代码质量优秀。');
}

// 运行主函数
// ES模块直接执行检查
try {
  main();
} catch (error) {
  logError(`测试套件执行失败: ${error.message}`);
  process.exit(1);
}

export { runStyleLint, checkBrowserCompatibility };