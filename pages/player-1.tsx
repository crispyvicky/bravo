import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ShinyText from "@/components/ShinyText";
import CannonFlair, { type CannonFlairHandle } from "@/components/CannonFlair";


export default function PlayerOne() {
  const stats = [
    { value: "15+", label: "Projects Shipped" },
    { value: "$1M+", label: "Client Savings" },
    { value: "100%", label: "Direct Communication" }
  ];

  const skills = [
    "Frontend Development",
    "Backend Development",
    "Database Management",
    "Cloud & Hosting (AWS)",
    "Mobile App Development",
    "UI/UX Design",
    "Automation & AI",
    "Marketing"
  ];

  const cannonRef = useRef<CannonFlairHandle | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Head>
        <title>Player 1 - Meet Vignesh Yadav, Founder & Developer | Bravoo</title>
        <meta name="description" content="Meet Vignesh Yadav, 21-year-old founder of Bravoo. Direct access to expert development with no middlemen. Built 15+ projects, saved clients $1M+." />
        <meta name="keywords" content="Vignesh Yadav, founder, developer, full-stack, direct communication, no middlemen, expert development" />
        <link rel="canonical" href="https://bravoo.in/player-1" />
        <meta property="og:title" content="Player 1 - Meet Vignesh Yadav, Founder & Developer" />
        <meta property="og:description" content="21-year-old founder offering direct access to expert development with no middlemen." />
        <meta property="og:url" content="https://bravoo.in/player-1" />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Player 1 - Meet Vignesh Yadav, Founder & Developer" />
        <meta name="twitter:description" content="21-year-old founder offering direct access to expert development with no middlemen." />
      </Head>

      <div className="relative min-h-screen bg-background" style={{ overflowX: 'hidden' }}>
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-center">
                {/* Content - 3 columns */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-hero text-foreground mb-4 md:mb-6 animate-fade-in">
                    Player 1: Building Bravoo
                  </h1>

                  <div className="text-base sm:text-lg md:text-xl text-muted-foreground space-y-3 md:space-y-4 mb-6 md:mb-8 animate-fade-in-delay text-left">
                    <p className="font-semibold leading-relaxed">21-year-old founder. No BS, no middlemen.</p>
                    <p className="leading-relaxed">Direct access to me + allies from top tech companies when needed.</p>
                    <p className="leading-relaxed">Built 15+ projects. Saved clients $1M+ vs agencies.</p>
                    <p className="font-medium leading-relaxed">Your project gets my full focus.</p>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 md:gap-6 mb-6 md:mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="card-metric min-w-[120px] sm:min-w-32 flex-1 sm:flex-none">
                        <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href="/start-quest">
                    <Button className="btn-hero w-full sm:w-auto">
                      Let's Build Together
                    </Button>
                  </Link>
                </div>

                {/* Profile Card - 2 columns */}
                <div className="lg:col-span-2 flex justify-center order-1 lg:order-2 mb-8 lg:mb-0">
                  <div className="card-surface max-w-80 w-full text-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center">
                      <img src="founder/founder.webp" alt="Founder" className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-2 uppercase">
                      <ShinyText text="vignesh yadav" speed={3} />
                    </h3>

                    <p className="text-sm sm:text-body text-primary font-medium mb-4">
                      Level 21 Founder & Developer
                    </p>

                    <div className="mb-4 md:mb-6">
                      <div className="progress-bar mb-2">
                        <div
                          className="progress-fill"
                          style={{ width: '85%' }}
                        />
                      </div>
                      <p className="text-xs sm:text-small text-muted-foreground">
                        Experience Level: 85/100
                      </p>
                    </div>

                    <div className="achievement-badge text-xs sm:text-sm">
                      Network Scaling Ready
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-12 md:py-24 bg-gray-100" style={{ position: 'relative' }}>
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              {/* Section Header */}
              <div className="text-center mb-8 md:mb-16">
                <div className="relative inline-block mb-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 font-heading text-section text-foreground inline-block" style={{ marginRight: 0, paddingRight: 0 }}>
                    Arsenal Unlocked
                  </h2>
                  <div className="hidden sm:block" style={{ position: 'absolute', left: '100%', top: '50%', transformOrigin: 'left center', transform: 'translateY(-50%) scale(0.5)', marginLeft: 0, paddingLeft: 0 }}>
                    <div style={{ width: 160, height: 140, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                      <div
                        ref={anchorRef}
                        className="relative"
                        style={{ width: 96, height: 120 }}
                        onMouseEnter={() => cannonRef.current?.fire()}
                      />
                      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50 }}>
                        <CannonFlair ref={cannonRef} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 font-body px-4">
                  Core skills + specialist network when needed.
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 flex items-center justify-center h-24 sm:h-28 md:h-32 text-center font-medium text-sm sm:text-base text-gray-900 hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* <BravooOriginStory/> */}

          {/* Story Section */}
          <section className="py-12 md:py-20 bg-background" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="text-center">
                <span className="text-xs tracking-widest font-bold text-gray-500 uppercase mb-4 md:mb-6 block">
                  ━━━ THE STORY BEHIND BRAVOO ━━━
                </span>
                <div className="text-base sm:text-lg text-muted-foreground space-y-4 md:space-y-6 max-w-3xl mx-auto leading-relaxed" style={{ backgroundImage: 'url(/path.svg)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                  <p>
                    Started coding at 15. Built my first profitable app at 17.
                    Worked with startups that burned through $100K+ on bloated agencies.
                  </p>
                  <p>
                    <strong className="text-foreground">The problem?</strong> Layers of account managers,
                    endless meetings, and developers who never talk to clients.
                  </p>
                  <p>
                    <strong className="text-foreground">My solution?</strong> Direct access.
                    You talk to the person writing your code. No middlemen. No fluff.
                  </p>
                  <p>
                    When projects need specialists, I tap into my network of senior engineers
                    from Google, Microsoft, and Meta. You get enterprise-level expertise
                    without the enterprise price tag.
                  </p>
                </div>
                <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/guild">
                    <Button className="btn-primary w-full sm:w-auto">
                      Meet the Guild
                    </Button>
                  </Link>
                  <Link href="/boss-fights">
                    <Button className="btn-secondary w-full sm:w-auto">
                      See Battle History
                    </Button>
                  </Link>
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
