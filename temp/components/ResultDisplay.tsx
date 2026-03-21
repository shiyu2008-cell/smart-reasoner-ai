import * as React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Copy, Download, Trash2, Check, Loader2, ChevronUp, ChevronDown } from "lucide-react"

export interface ResultDisplayProps {
  /**
   * 要显示的完整内容（Markdown格式）
   */
  content: string
  /**
   * 是否正在流式输出（用于显示加载状态）
   * @default false
   */
  isStreaming?: boolean
  /**
   * 打字机效果的速度（毫秒每字符）
   * @default 20
   */
  typingSpeed?: number
  /**
   * 是否自动开始打字机动画
   * @default true
   */
  autoType?: boolean
  /**
   * 清空内容的回调函数
   */
  onClear?: () => void
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 自定义Markdown渲染函数
   * 如果未提供，将使用纯文本渲染
   */
  renderMarkdown?: (content: string) => React.ReactNode
}

/**
 * 结果展示区组件
 * 
 * 支持Markdown渲染、流式输出打字机效果、复制、下载和清空功能
 */
export const ResultDisplay = React.memo(function ResultDisplay({
  content,
  isStreaming = false,
  typingSpeed = 20,
  autoType = true,
  onClear,
  className,
  renderMarkdown,
}: ResultDisplayProps) {
  // 内部状态
  const [displayedContent, setDisplayedContent] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)
  
  // 引用用于自动滚动
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const contentEndRef = useRef<HTMLDivElement>(null)
  
  // 打字机效果
  useEffect(() => {
    if (!autoType || !content || isStreaming) {
      // 如果不是自动打字、没有内容或正在流式输出，直接显示完整内容
      setDisplayedContent(content)
      return
    }
    
    setIsTyping(true)
    setDisplayedContent("")
    
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex >= content.length) {
        clearInterval(timer)
        setIsTyping(false)
        return
      }
      
      // 每次增加一个字符
      setDisplayedContent((prev) => prev + content[currentIndex])
      currentIndex++
    }, typingSpeed)
    
    return () => {
      clearInterval(timer)
      setIsTyping(false)
    }
  }, [content, autoType, typingSpeed, isStreaming])
  
  // 当内容变化时，如果是流式输出模式，直接更新显示内容
  useEffect(() => {
    if (isStreaming) {
      setDisplayedContent(content)
    }
  }, [content, isStreaming])
  
  // 自动滚动到底部
  useEffect(() => {
    if (contentEndRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current
      container.scrollTop = container.scrollHeight
    }
  }, [displayedContent, isStreaming])
  
  // 复制到剪贴板
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content)
      setIsCopied(true)
      // 添加触觉反馈
      if (navigator.vibrate) navigator.vibrate(50)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("复制失败:", err)
      // 降级方案：使用document.execCommand
      const textArea = document.createElement("textarea")
      textArea.value = content
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }, [content])
  
  // 下载为文件
  const handleDownload = useCallback(() => {
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `优化简历-${new Date().toISOString().split("T")[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setIsDownloaded(true)
    if (navigator.vibrate) navigator.vibrate([50, 30, 50])
    setTimeout(() => setIsDownloaded(false), 2000)
  }, [content])
  
  // 清空内容
  const handleClear = useCallback(() => {
    setDisplayedContent("")
    if (onClear) {
      onClear()
    }
  }, [onClear])
  
  // 渲染内容
  const renderContent = () => {
    if (renderMarkdown) {
      return renderMarkdown(displayedContent)
    }
    
    // 默认纯文本渲染，保留换行符，优化可读性
    return (
      <div className="whitespace-pre-wrap break-words text-base leading-relaxed text-gray-800">
        {displayedContent}
      </div>
    )
  }
  
  return (
    <Card className={cn("flex flex-col h-full border-2 border-primary/10 shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 md:px-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg gradient-text">优化结果</h3>
          {isStreaming && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="relative">
                <Loader2 className="h-3 w-3 animate-spin" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-sm opacity-30" />
              </div>
              <span>流式输出中...</span>
            </div>
          )}
          {isTyping && !isStreaming && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
              <span>正在生成...</span>
            </div>
          )}
        </div>
        
        {/* 操作按钮组 - 移动端优化 */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!content || isTyping || isStreaming}
            className={cn(
              "h-8 px-2 md:px-3 transition-all duration-300",
              isCopied 
                ? "bg-green-500/10 text-green-600 hover:bg-green-500/20" 
                : "hover:bg-primary/10"
            )}
            aria-label={isCopied ? "已复制" : "复制到剪贴板"}
          >
            {isCopied ? (
              <Check className="h-4 w-4 animate-micro-celebration" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only md:not-sr-only md:ml-1">
              {isCopied ? "已复制" : "复制"}
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            disabled={!content || isTyping || isStreaming}
            className={cn(
              "h-8 px-2 md:px-3 transition-all duration-300",
              isDownloaded
                ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                : "hover:bg-primary/10"
            )}
            aria-label={isDownloaded ? "已下载" : "下载文件"}
          >
            {isDownloaded ? (
              <Check className="h-4 w-4 animate-micro-celebration" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span className="sr-only md:not-sr-only md:ml-1">
              {isDownloaded ? "已下载" : "下载"}
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={!content || isTyping || isStreaming}
            className="h-8 px-2 md:px-3 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
            aria-label="清空内容"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-1">清空</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto p-4 md:p-6 min-h-[300px] md:min-h-[400px] bg-gradient-to-b from-background to-muted/5 relative"
        >
          {/* 顶部渐变遮罩 */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          {/* 内容区域 */}
          {renderContent()}
          {/* 用于自动滚动的锚点 */}
          <div ref={contentEndRef} />
          
          {/* 流式输出时的光标效果 - 自然打字动画 */}
          {(isTyping || isStreaming) && (
            <span className="inline-block h-5 w-[3px] bg-gradient-to-b from-primary to-accent ml-1 -mb-1 animate-natural-typing rounded-full" />
          )}
          
          {/* 空状态 */}
          {!content && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg opacity-20" />
                </div>
                <div>
                  <p className="text-lg font-medium">等待生成结果</p>
                  <p className="text-sm mt-1">AI优化后的简历将显示在这里</p>
                </div>
              </div>
            </div>
          )}
          
          {/* 底部渐变遮罩 */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </div>
      </CardContent>
      <CardFooter className="py-3 px-4 md:px-6 border-t bg-gradient-to-r from-transparent to-primary/5 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex items-center gap-4">
          {content && (
            <span>
              共 {content.length} 个字符 •{" "}
              {Math.ceil(content.split(/\s+/).length)} 个单词
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
              }
            }}
            className="flex items-center gap-1 hover:text-foreground transition-colors touch-target-sm"
            aria-label="滚动到顶部"
          >
            <ChevronUp className="h-3 w-3" />
            顶部
          </button>
          <button
            type="button"
            onClick={() => {
              if (contentEndRef.current && scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                container.scrollTop = container.scrollHeight;
              }
            }}
            className="flex items-center gap-1 hover:text-foreground transition-colors touch-target-sm"
            aria-label="滚动到底部"
          >
            <ChevronDown className="h-3 w-3" />
            底部
          </button>
          {/* 打字速度指示器 */}
          {(isTyping || isStreaming) && (
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span>{typingSpeed}ms/字符</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
})