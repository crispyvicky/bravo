import Head from 'next/head';
import dynamic from 'next/dynamic';
  import Header from "@/components/Header";
import Hero from "@/components/Hero";

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

export default function Index() {
  return (
    <>
      <Head>
        <title>Bravoo - Full-Stack Development Services | Web, Mobile & AI Solutions</title>
        <meta name="description" content="Professional full-stack development services including web apps, mobile apps, AI/ML solutions, and cloud infrastructure. Get your project built by expert developers." />
        <meta name="keywords" content="full-stack development, web development, mobile apps, AI solutions, cloud services, React, Next.js, Node.js" />
        <link rel="canonical" href="https://bravoo.in/" />
        <meta property="og:title" content="Bravoo - Full-Stack Development Services" />
        <meta property="og:description" content="Professional full-stack development services including web apps, mobile apps, AI/ML solutions, and cloud infrastructure." />
        <meta property="og:url" content="https://bravoo.in/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bravoo - Full-Stack Development Services" />
        <meta name="twitter:description" content="Professional full-stack development services including web apps, mobile apps, AI/ML solutions, and cloud infrastructure." />
      </Head>
      
      <div className="min-h-screen bg-background">
        <Header />
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
