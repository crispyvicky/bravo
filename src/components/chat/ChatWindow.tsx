import { useRef, useEffect, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, X, Minimize2, MessageSquare, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatWindowProps {
    onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I'm **Bravoo AI**. How can I assist you with your software development needs today?" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 300);
    }, []);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch response");
            }

            setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
        } catch (error: any) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: `**Error**: ${error.message || "Something went wrong."}` },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-24 right-6 left-6 md:left-auto md:bottom-24 md:right-6 z-50 flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] md:w-[420px] h-[600px]"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-sm">
                        <Sparkles className="h-5 w-5 text-white" />
                        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0A0A0A]"></span>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-base font-medium text-white tracking-wide">Bravoo AI</h3>
                        <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Online Assistant</span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                    onClick={onClose}
                >
                    <Minimize2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent space-y-6"
            >
                {messages.map((msg, i) => (
                    <ChatMessage key={i} role={msg.role} content={msg.content} />
                ))}
                {isLoading && (
                    <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-1 h-10 px-4 bg-zinc-900/50 rounded-2xl rounded-tl-none border border-white/5">
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0A0A0A]">
                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center gap-2 p-2 rounded-[20px] bg-zinc-900/50 border border-white/5 focus-within:border-white/10 focus-within:bg-zinc-900 transition-all duration-300 shadow-inner"
                >
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="flex-1 border-none bg-transparent px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isLoading}
                        className={cn(
                            "h-10 w-10 rounded-full transition-all duration-300 shadow-sm",
                            input.trim()
                                ? "bg-white text-black hover:bg-zinc-200 hover:scale-105"
                                : "bg-zinc-800 text-zinc-600"
                        )}
                    >
                        <Send className="h-4 w-4 ml-0.5" />
                    </Button>
                </form>
                <div className="mt-3 flex justify-center items-center gap-4">
                    <span className="text-[10px] text-zinc-700 font-medium tracking-wide">POWERED BY BRAVOO INTELLIGENCE</span>
                </div>
            </div>
        </motion.div>
    );
}
