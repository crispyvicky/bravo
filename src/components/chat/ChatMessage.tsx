import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} // Snappy easing
            className={cn(
                "flex w-full items-start gap-4",
                role === "user" ? "flex-row-reverse" : "flex-row"
            )}
        >
            <div
                className={cn(
                    "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm transition-all duration-300",
                    role === "user"
                        ? "bg-white text-black border-transparent"
                        : "bg-white/5 text-zinc-400 border-white/10"
                )}
            >
                {role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            </div>

            <div
                className={cn(
                    "relative max-w-[85%] px-5 py-3.5 text-sm leading-relaxed shadow-sm",
                    role === "user"
                        ? "bg-white text-black rounded-2xl rounded-tr-sm font-medium"
                        : "bg-zinc-900/50 text-zinc-100 border border-white/5 rounded-2xl rounded-tl-sm backdrop-blur-sm"
                )}
            >
                <ReactMarkdown
                    className={cn(
                        "prose prose-sm break-words",
                        role === "user" ? "text-black prose-p:text-black" : "prose-invert text-zinc-100 prose-p:text-zinc-200 prose-strong:text-white"
                    )}
                    components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        a: ({ node, href, children, ...props }) => (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={role === "user" ? "text-blue-600 underline" : "text-blue-400 hover:text-blue-300 underline transition-colors"}
                                {...props}
                            >
                                {children}
                            </a>
                        ),
                        code: ({ node, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <div className="bg-black/50 rounded-lg p-3 my-3 overflow-x-auto border border-white/10">
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                </div>
                            ) : (
                                <code className={cn(
                                    "px-1.5 py-0.5 rounded font-mono text-xs font-semibold",
                                    role === "user" ? "bg-black/10 text-black border border-black/5" : "bg-white/10 text-zinc-200 border border-white/5"
                                )} {...props}>
                                    {children}
                                </code>
                            )
                        },
                        ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 my-2">{children}</ol>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
}
