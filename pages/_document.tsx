import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logo/brlogo.webp" as="image" type="image/png" />
        <link rel="preload" href="/founder/founder.webp" as="image" type="image/png" />
        <link rel="preload" href="/landing-mi.webp" as="image" type="image/png" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" onLoad={(e) => { const link = e.currentTarget as HTMLLinkElement; link.onload = null; link.rel = 'stylesheet'; }} />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" /></noscript>
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Resource hints for faster loading */}
        <link rel="prefetch" href="/_next/static/chunks/framework.js" />
        <link rel="prefetch" href="/_next/static/chunks/main.js" />
        
        {/* Critical CSS inline for faster first paint */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              margin: 0; 
              font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #ffffff;
              color: #1f2937;
            }
            .loading { opacity: 0; }
            .loaded { opacity: 1; transition: opacity 0.3s ease; }
            
            /* Critical above-the-fold styles */
            .min-h-screen { min-height: 100vh; }
            .bg-background { background-color: #ffffff; }
            .text-foreground { color: #1f2937; }
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .fixed { position: fixed; }
            .top-0 { top: 0; }
            .left-0 { left: 0; }
            .right-0 { right: 0; }
            .z-50 { z-index: 50; }
            .h-20 { height: 5rem; }
            .w-28 { width: 7rem; }
            .h-28 { height: 7rem; }
            .pt-20 { padding-top: 5rem; }
            .text-hero { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; line-height: 1.2; }
            .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
            
            @keyframes fadeIn {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `
        }} />
      </Head>
      <body className="loading">
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{
          __html: `
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Register service worker for caching
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('SW registered: ', registration);
                  })
                  .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `
        }} />
      </body>
    </Html>
  )
}
