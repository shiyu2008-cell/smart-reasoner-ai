# Open Graph 图片配置说明

## 当前配置
- **文件**: `app/opengraph-image.svg`
- **规格**: 1200×630像素，SVG格式
- **用途**: 社交媒体分享预览图（Facebook、Twitter、LinkedIn等）

## 转换为PNG格式

### 方法1：使用在线转换工具
1. 访问 [SVG to PNG Converter](https://svgtopng.com/)
2. 上传 `opengraph-image.svg`
3. 设置输出尺寸为 1200×630 像素
4. 下载转换后的PNG文件
5. 重命名为 `opengraph-image.png` 并放置在 `app/` 目录下

### 方法2：使用命令行工具（需要ImageMagick）
```bash
# 安装ImageMagick
# Windows: https://imagemagick.org/script/download.php
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# 转换为PNG
magick convert opengraph-image.svg opengraph-image.png

# 调整尺寸（如果需要）
magick convert opengraph-image.png -resize 1200x630 opengraph-image.png
```

### 方法3：使用设计软件
1. 使用 Adobe Illustrator、Figma、Sketch 等设计软件打开SVG
2. 导出为PNG格式，尺寸设置为1200×630像素
3. 优化文件大小到 <1MB

## 设计建议（如需重新设计）

### 视觉要求
1. **品牌一致性**: 使用ResumeAI品牌色系（主色：#4f46e5，辅色：#7c3aed）
2. **核心信息**:
   - 品牌Logo: "ResumeAI"
   - 价值主张: "AI简历优化工具"
   - 核心功能: "智能评估 • 专业优化 • 提升求职成功率"
   - 网站地址: "resume-ai.com"
3. **视觉层次**: 清晰的文字层次，移动端友好的字体大小
4. **留白空间**: 适当的边距，避免内容过于拥挤

### 技术规格
- **尺寸**: 1200×630像素（1.91:1宽高比）
- **格式**: PNG（推荐）或 JPG
- **文件大小**: <1MB
- **色彩模式**: RGB
- **分辨率**: 72-150 DPI（屏幕显示）

## 测试验证

### 社交平台测试工具
1. **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
3. **LinkedIn**: [Post Inspector](https://www.linkedin.com/post-inspector/)

### 本地测试
```bash
# 启动开发服务器
npm run dev

# 访问测试页面
# 查看页面源代码，确认OG标签正确引用图片
```

## 更新记录
- **2026-02-14**: 创建基础SVG模板，包含品牌标识和核心信息
- **下一步**: 转换为PNG格式，优化视觉设计，测试社交分享效果

## 注意事项
1. 所有页面共享同一个OG图片，确保品牌一致性
2. 定期更新图片以反映产品功能和营销活动
3. 测试在不同社交平台上的显示效果
4. 监控图片加载性能，确保快速加载