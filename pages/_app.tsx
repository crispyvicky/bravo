import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import "@/index.css";

// Lazy load analytics for better performance
const Analytics = dynamic(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })), {
  ssr: false,
});

// Render ribbons on all pages except the home page - only on desktop with mouse
const Ribbons = dynamic(() => import("@/components/ribbons"), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in older versions)
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {router.pathname !== '/' && router.pathname !== '/boss-fights' && (
          <div className="fixed inset-0 pointer-events-none z-10">
            <Ribbons
              colors={["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]}
              speedMultiplier={0.5}
              maxAge={220}
            />
          </div>
        )}
        <ChatWidget />
        <Component {...pageProps} />
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
