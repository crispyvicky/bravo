import Head from 'next/head';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ElectricBorder from "@/components/electricborder";
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
    { value: "$2M+", label: "Client Savings" },
    { value: "100%", label: "Mission Success Rate" },
    { value: "24hr", label: "Average Response Time" }
  ];

  return (
    <>
      <Head>
        <title>Boss Fights Won - Real Client Success Stories | Bravoo</title>
        <meta name="description" content="See real battles won: Legacy system modernization, scale challenges, automation solutions, and mobile app rebuilds. $2M+ in client savings achieved." />
        <meta name="keywords" content="client success stories, case studies, legacy modernization, scaling solutions, mobile app development, automation" />
        <link rel="canonical" href="https://bravoo.in/boss-fights" />
        <meta property="og:title" content="Boss Fights Won - Real Client Success Stories" />
        <meta property="og:description" content="See real battles won with $2M+ in client savings and 100% success rate." />
        <meta property="og:url" content="https://bravoo.in/boss-fights" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Boss Fights Won - Real Client Success Stories" />
        <meta name="twitter:description" content="See real battles won with $2M+ in client savings and 100% success rate." />
      </Head>

      <div className="relative min-h-screen bg-background">
        {/* <Ribbons /> */}
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <div className="flex justify-center mt-4">
            <Link href="/wall-of-fame" className="text-blue-600 font-inter hover:underline text-lg">See All Wins (Wall of Fame)</Link>
          </div>
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                <h1 className="text-hero text-foreground mb-4 animate-fade-in">
                  Boss Fights Won
                </h1>
                <p className="text-xl text-muted-foreground animate-fade-in-delay">
                  Real battles. Real results. Real businesses saved.
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {metrics.map((metric, index) => (
                  <div key={index} className="card-metric">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Battle Stories */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="space-y-16">
                {battles.map((battle, index) => (
                  <div
                    key={index}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                  >
                    {/* Battle Image/Icon */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <ElectricBorder color="#FF6F61" speed={0.7} chaos={0.2} thickness={2} style={{ borderRadius: 6 }}>
                        <div className="card-surface text-center py-16 bg-gradient-to-br from-primary/10 to-success/5">
                          <div className="text-8xl mb-4">{battle.image}</div>
                          <div className="text-lg font-semibold text-foreground mb-2">
                            {battle.client}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {battle.timeline} • {battle.techStack.join(", ")}
                          </div>
                        </div>
                      </ElectricBorder>
                    </div>

                    {/* Battle Details */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <h3 className="text-subsection text-foreground mb-4">
                        {battle.title}
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">⚔️ The Challenge:</h4>
                          <p className="text-body text-muted-foreground">
                            {battle.challenge}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">🧠 The Strategy:</h4>
                          <p className="text-body text-muted-foreground">
                            {battle.strategy}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">🏆 The Victory:</h4>
                          <ul className="space-y-2">
                            {battle.victory.map((result, i) => (
                              <li key={i} className="flex items-center text-body text-muted-foreground">
                                <span className="text-success mr-2">✓</span>
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
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-section text-foreground mb-4">
                  What Clients Say
                </h2>
                <p className="text-xl text-muted-foreground">
                  Direct feedback from the battlefield.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <ElectricBorder color="#7df9ff" speed={0.7} chaos={0.2} thickness={2} style={{ borderRadius: 16 }}>
                <div className="card-surface">
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-body text-muted-foreground mb-4 italics">
                    "Vignesh saved our company. Our legacy system was killing us, and agencies 
                    wanted $500K+ for a complete rewrite. He modernized it piece by piece with 
                    zero downtime. Absolute game-changer."
                  </p>
                  <div className="font-semibold text-foreground">
                    Sarah Mitchell, CTO at FinSecure
                  </div>
                </div>
                </ElectricBorder>

                <ElectricBorder color="#7df9ff" speed={0.7} chaos={0.2} thickness={2} style={{ borderRadius: 16 }}>
                <div className="card-surface">
                  <div className="text-4xl mb-4">⭐</div>
                  <p className="text-body text-muted-foreground mb-4 italic">
                    "Finally, a developer who actually talks to you. No account managers, 
                    no endless meetings. Just results. Our app went from 1-star to 4.8 stars 
                    in 4 months after his team took over the project and built it from scratch."
                  </p>
                  <div className="font-semibold text-foreground">
                    Marcus Rodriguez, Founder at QuickBite
                  </div>
                </div>
                </ElectricBorder>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center">
                <h2 className="text-section text-foreground mb-4">
                  Ready to Face Your Boss?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Every project has a final boss. Let's defeat yours together.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/start-quest">
                    <Button className="btn-hero">
                      Start Your Battle
                    </Button>
                  </Link>
                  <Link href="/guild">
                    <Button className="btn-secondary">
                      Meet the Guild
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 text-sm text-muted-foreground">
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
