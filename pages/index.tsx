import Head from 'next/head';
import dynamic from 'next/dynamic';
  import Header from "@/components/Header";
import Hero from "@/components/Hero";
// import SplashCurser from "@/components/splashcurser";

// Lazy load below-the-fold components for better LCP
const ProblemSolution = dynamic(() => import("@/components/ProblemSolution"), {
  loading: () => <div className="h-96 bg-muted animate-pulse" />
});
const GameProcess = dynamic(() => import("@/components/GameProcess"), {
  loading: () => <div className="h-96 bg-muted animate-pulse" />
});
const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="h-96 bg-muted animate-pulse" />
});
const Team = dynamic(() => import("@/components/Team"), {
  loading: () => <div className="h-96 bg-muted animate-pulse" />
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="h-96 bg-muted animate-pulse" />
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-32 bg-muted animate-pulse" />
});
// Client-only ribbons (uses WebGL/window)
const Ribbons = dynamic(() => import("@/components/ribbons"), { ssr: false });

export default function Index() {
  return (
    <>
      <Head>
        <title>Best Software Development Company in India | Bravoo</title>
        <meta name="description" content="Bravoo builds high-quality software solutions in web, mobile, and AI. Discover why startups and businesses choose us as the best software development company in India." />
        <meta name="keywords" content="full-stack development, web development, mobile apps, AI solutions, cloud services, React, Next.js, Node.js" />
        <link rel="canonical" href="https://bravoo.in/" />
        <meta property="og:title" content="Best Software Development Company in India | Bravoo" />
        <meta property="og:description" content="Bravoo builds high-quality software solutions in web, mobile, and AI. Discover why startups and businesses choose us as the best software development company in India." />
        <meta property="og:url" content="https://bravoo.in/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Software Development Company in India | Bravoo" />
        <meta name="twitter:description" content="Bravoo builds high-quality software solutions in web, mobile, and AI. Discover why startups and businesses choose us as the best software development company in India." />
      </Head>
      
      <div className="min-h-screen bg-background relative">
        {/* <SplashCurser /> */}
        <Header />
        {/* Full-page decorative ribbons */}
        <Ribbons />
        <main>
          <Hero />
          <ProblemSolution />
          <GameProcess />
          <Services />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
