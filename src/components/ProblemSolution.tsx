import { useState } from 'react';

const ProblemSolution = () => {
  const [showImage, setShowImage] = useState(false);
  return (
    <section id="solution" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-section text-foreground">
              <span
                className="relative cursor-pointer"
                onMouseEnter={() => setShowImage(true)}
                onMouseLeave={() => setShowImage(false)}
                onClick={() => setShowImage(!showImage)}
              >
                <span className="relative">
                  T
                  {showImage && (
                    <img
                      src="/landing-mi.webp"
                      alt="Landing MI"
                      className="absolute top-0 left-0 w-8 h-8 z-10"
                    />
                  )}
                </span>
                ired of{" "}
              </span>
              <span className="text-warning">bloated agencies</span>?
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Skip the layers of account managers and endless meetings. Work directly with the 
              developer who writes your code and owns your outcome.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="text-success font-bold">✓</div>
                <span className="text-body">Transparent pricing & timelines</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-success font-bold">✓</div>
                <span className="text-body">Weekly demos, zero surprises</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-success font-bold">✓</div>
                <span className="text-body">On-demand big-tech specialists</span>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 gap-6">
            <div className="card-metric hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-primary mb-2">50%</div>
              <div className="text-sm font-medium text-muted-foreground">Faster Delivery</div>
            </div>
            
            <div 
              className="card-metric hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-4xl font-bold text-success mb-2">100%</div>
              <div className="text-sm font-medium text-muted-foreground">Direct Communication</div>
            </div>
            
            <div 
              className="card-metric hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-4xl font-bold text-warning mb-2">24/7</div>
              <div className="text-sm font-medium text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;