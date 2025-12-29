import { useState } from "react";
import { ChatWindow } from "./chat/ChatWindow";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <ChatWindow onClose={() => setIsOpen(false)} />
                )}
            </AnimatePresence>

            <div className="relative group">
                <AnimatePresence>
                    {!isOpen && isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 10, scale: 0.9 }}
                            className="absolute right-full mr-3 top-2 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1.5 text-xs text-white backdrop-blur-md border border-white/10"
                        >
                            Chat with AI
                            <span className="absolute right-0 top-1/2 -mr-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-black/80 border-r border-t border-white/10"></span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={cn(
                        "relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300",
                        isOpen
                            ? "bg-red-500 rotate-90"
                            : "bg-gradient-to-tr from-indigo-600 to-violet-600 hover:shadow-indigo-500/50"
                    )}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                            >
                                <X className="h-6 w-6 text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0, rotate: 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: -90 }}
                                className="relative"
                            >
                                <MessageCircle className="h-7 w-7 text-white" />
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
}
