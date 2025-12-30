import Head from 'next/head';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
// import ElectricBorder from "@/components/electricborder";
// import Ribbons from '@/components/ribbons';

export default function BossFights() {
  const battles = [
    {
      title: "Defeated the Legacy Monster",
      client: "FinTech Startup",
      challenge: "20-year-old banking system causing daily crashes, costing $50K monthly in downtime.",
      strategy: "Incremental modernization with zero-downtime migration strategy.",
      victory: ["99.9% uptime achieved", "$600K annual savings", "10x faster processing"],
      image: "🏦",
      timeline: "16 weeks",
      techStack: ["Node.js", "PostgreSQL", "AWS", "Docker"]
    },
    {
      title: "Conquered the Scale Dragon",
      client: "E-commerce Platform",
      challenge: "Site crashed during Black Friday, losing $2M in sales within 4 hours.",
      strategy: "Auto-scaling infrastructure with CDN optimization and database sharding.",
      victory: ["2x faster load times", "Handled 10x traffic", "$5M+ Black Friday sales"],
      image: "🛒",
      timeline: "12 weeks",
      techStack: ["React", "Node.js", "Redis", "AWS CloudFront"]
    },
    {
      title: "Slayed the Manual Task Beast",
      client: "Healthcare Network",
      challenge: "Staff spending 40 hours/week on data entry, causing burnout and errors.",
      strategy: "AI-powered automation with error detection and smart routing.",
      victory: ["80% time savings", "95% fewer errors", "Staff happiness +300%"],
      image: "🏥",
      timeline: "8 weeks",
      techStack: ["Python", "AI/ML", "FastAPI", "PostgreSQL"]
    },
    {
      title: "Vanquished the Mobile Chaos",
      client: "Food Delivery App",
      challenge: "App crashes on 30% of orders, 1-star rating, losing customers daily.",
      strategy: "Complete rebuild with React Native, real-time tracking, and offline support.",
      victory: ["4.8-star rating", "100K+ active users", "Series A funding secured"],
      image: "🍕",
      timeline: "20 weeks",
      techStack: ["React Native", "Node.js", "Socket.io", "MongoDB"]
    }
  ];

  const metrics = [
    { value: "15+", label: "Boss Fights Won" },
    { value: "1M+", label: "Client Savings" },
    { value: "100%", label: "Mission Success Rate" },
    { value: "24hr", label: "Average Response Time" }
  ];

  return (
    <>
      <Head>
        <title>Boss Fights Won - Real Client Success Stories | Bravoo</title>
        <meta name="description" content="See real battles won: Legacy system modernization, scale challenges, automation solutions, and mobile app rebuilds. $1M+ in client savings achieved." />
        <meta name="keywords" content="client success stories, case studies, legacy modernization, scaling solutions, mobile app development, automation" />
        <link rel="canonical" href="https://bravoo.in/boss-fights" />
        <meta property="og:title" content="Boss Fights Won - Real Client Success Stories" />
        <meta property="og:description" content="See real battles won with $1M+ in client savings and 100% success rate." />
        <meta property="og:url" content="https://bravoo.in/boss-fights" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Boss Fights Won - Real Client Success Stories" />
        <meta name="twitter:description" content="See real battles won with $1M+ in client savings and 100% success rate." />
      </Head>

      {/* Background applied here: Beige + Noise Texture + Gradient */}
      <div className="relative min-h-screen" style={{
        backgroundColor: '#f5f0e6',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E"), linear-gradient(135deg, rgba(245, 240, 230, 0.8) 0%, rgba(220, 210, 190, 0.4) 100%)`,
        backgroundBlendMode: 'overlay'
      }}>
        {/* <Ribbons /> */}
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <div className="flex justify-center mt-4 px-4">
            <Link href="/wall-of-fame" className="text-blue-600 font-inter hover:underline text-sm sm:text-base md:text-lg">See All Wins (Wall of Fame)</Link>
          </div>
          <section className="py-12 md:py-20 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              <div className="text-center mb-8 md:mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-hero text-foreground mb-4 animate-fade-in mix-blend-multiply opacity-90">
                  Boss Fights Won
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground animate-fade-in-delay px-4 text-center mix-blend-multiply">
                  Real battles. Real results. Real businesses saved.
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-16">
                {metrics.map((metric, index) => (
                  <div key={index} className="card-metric bg-white/50 backdrop-blur-sm border-2 border-stone-200 shadow-sm">
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 font-medium">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Battle Stories */}
          <section className="py-12 md:py-20 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              <div className="space-y-8 md:space-y-16">
                {battles.map((battle, index) => (
                  <div
                    key={index}
                    className={`grid lg:grid-cols-2 gap-6 md:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                      }`}
                  >
                    {/* Battle Image/Icon */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="card-surface text-center py-8 sm:py-12 md:py-16 bg-white/60 backdrop-blur-sm shadow-md border-2 border-stone-200 transform rotate-1 transition-transform hover:rotate-0">
                        <div className="text-5xl sm:text-6xl md:text-8xl mb-3 sm:mb-4 drop-shadow-md">{battle.image}</div>
                        <div className="text-base sm:text-lg font-semibold text-stone-800 mb-2 font-serif">
                          {battle.client}
                        </div>
                        <div className="text-xs sm:text-sm text-stone-600 px-2 font-mono">
                          {battle.timeline} • {battle.techStack.join(", ")}
                        </div>
                      </div>
                    </div>

                    {/* Battle Details */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} text-center md:text-left`}>
                      <h3 className="text-xl sm:text-2xl md:text-subsection text-stone-900 mb-3 sm:mb-4 font-bold tracking-tight">
                        {battle.title}
                      </h3>

                      <div className="space-y-4 sm:space-y-6">
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-stone-800 mb-2 uppercase tracking-wide">⚔️ The Challenge:</h4>
                          <p className="text-sm sm:text-body text-stone-700 leading-relaxed font-serif">
                            {battle.challenge}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-stone-800 mb-2 uppercase tracking-wide">🧠 The Strategy:</h4>
                          <p className="text-sm sm:text-body text-stone-700 leading-relaxed font-serif">
                            {battle.strategy}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-stone-800 mb-2 uppercase tracking-wide">🏆 The Victory:</h4>
                          <ul className="space-y-2">
                            {battle.victory.map((result, i) => (
                              <li key={i} className="flex items-center justify-center md:justify-start text-sm sm:text-body text-stone-700 font-medium">
                                <span className="text-green-600 mr-2 font-bold">✓</span>
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Client Testimonials */}
          <section className="py-12 md:py-20 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-section text-stone-900 mb-4 font-bold">
                  What Clients Say
                </h2>
                <p className="text-xl text-stone-600">
                  Direct feedback from the battlefield.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="card-surface bg-white/70 shadow-lg border-2 border-stone-100 p-8 rotate-[-1deg]">
                  <div className="text-4xl mb-4 opacity-50">💬</div>
                  <p className="text-body text-stone-700 mb-6 italic leading-loose font-serif">
                    "Vignesh saved our company. Our legacy system was killing us, and agencies
                    wanted $500K+ for a complete rewrite. He modernized it piece by piece with
                    zero downtime. Absolute game-changer."
                  </p>
                  <div className="font-bold text-stone-900 border-t border-stone-200 pt-4">
                    Sarah Mitchell, CTO at FinSecure
                  </div>
                </div>

                <div className="card-surface bg-white/70 shadow-lg border-2 border-stone-100 p-8 rotate-[1deg]">
                  <div className="text-4xl mb-4 opacity-50">⭐</div>
                  <p className="text-body text-stone-700 mb-6 italic leading-loose font-serif">
                    "Finally, a developer who actually talks to you. No account managers,
                    no endless meetings. Just results. Our app went from 1-star to 4.8 stars
                    in 4 months after his team took over the project and built it from scratch."
                  </p>
                  <div className="font-bold text-stone-900 border-t border-stone-200 pt-4">
                    Marcus Rodriguez, Founder at QuickBite
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-transparent">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center">
                <h2 className="text-section text-stone-900 mb-4 font-black">
                  Ready to Face Your Boss?
                </h2>
                <p className="text-xl text-stone-600 mb-8">
                  Every project has a final boss. Let's defeat yours together.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/start-quest">
                    <Button className="btn-hero shadow-xl">
                      Start Your Battle
                    </Button>
                  </Link>
                  <Link href="/guild">
                    <Button className="btn-secondary bg-white/80 hover:bg-white text-stone-800 border-stone-300">
                      Meet the Guild
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 text-sm text-stone-500 font-mono">
                  🎯 Free consultation • ⚡ 24-hour response • 🛡️ Risk-free planning
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
