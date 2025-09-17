import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openConsultationModal = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-hero text-foreground">
            Ship Better Software,{" "}
            <span className="gradient-text">Faster</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in animation-delay-200">
            Direct access to a senior developer backed by a{" "}
            <span className="font-semibold text-foreground">big-tech network</span>. 
            Real prices, real results—no agency fluff.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
            <Button 
              onClick={openConsultationModal}
              className="btn-hero"
            >
              Start Project
            </Button>
            <Button 
              onClick={() => scrollToSection("process")}
              variant="outline"
              className="btn-secondary"
            >
              View Process
            </Button>
          </div>
        </div>

        {/* Floating Cards Visual */}
        <div className="relative lg:flex justify-center items-center animate-scale-in animation-delay-600">
          <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
            <div 
              className="card-floating"
              style={{ animationDelay: "0s" }}
            >
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-sm">Speed</div>
            </div>
            
            <div 
              className="card-floating ml-8"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-2xl mb-2">👑</div>
              <div className="font-semibold text-sm">Quality</div>
            </div>
            
            <div 
              className="card-floating"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-semibold text-sm">Trust</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;