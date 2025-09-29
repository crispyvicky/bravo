import { useEffect, useRef, useState } from "react";

const GameProcess = () => {
  const [visibleStages, setVisibleStages] = useState<boolean[]>([false, false, false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stages = [
    {
      icon: <img src="/monalisa/_1.png" alt="Discovery" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />,
      title: "Discovery",
      description: "Map out requirements & scope",
      xp: 100,
      progress: 18
    },
    {
      icon: <img src="/monalisa/_2.png" alt="Sprint Planning" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />,
      title: "Sprint Planning", 
      description: "Break down milestones",
      xp: 200,
      progress: 36
    },
    {
      icon: <img src="/monalisa/_3.png" alt="Development" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />,
      title: "Development",
      description: "Code, test, iterate weekly",
      xp: 500,
      progress: 68
    },
    {
      icon: <img src="/monalisa/_4.png" alt="Deployment" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />,
      title: "Deployment",
      description: "Launch & monitor",
      xp: 1000,
      progress: 90
    },
    {
      icon: <img src="/monalisa/_6.png" alt="Boss Battle Won" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl" />,
      title: "Boss Battle Won",
      description: "Project delivered successfully",
      isAchievement: true,
      progress: 100
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate stages with staggered delays
            stages.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStages(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-4">
            Level Up: The Bravoo Process
          </h2>
        </div>

        {/* Process Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`card-surface text-center transition-all duration-500 ${
                visibleStages[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${stage.isAchievement ? "border-warning bg-warning/5" : ""}`}
              style={{ minHeight: '300px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div className="text-4xl mb-4 flex justify-center">{stage.icon}</div>
              
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                {stage.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {stage.description}
              </p>

              {/* Progress Bar */}
              <div className="progress-bar mb-4">
                <div 
                  className={`progress-fill transition-all duration-800 ease-out ${
                    visibleStages[index] ? "w-full" : "w-0"
                  }`}
                  style={{ 
                    width: visibleStages[index] ? `${stage.progress}%` : "0%",
                    transitionDelay: `${index * 0.2}s`
                  }}
                />
              </div>

              {/* XP or Achievement Badge */}
              {stage.isAchievement ? (
                <div className="achievement-badge">
                  Achievement Unlocked!
                </div>
              ) : (
                <div className="xp-badge">
                  +{stage.xp} XP
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameProcess;