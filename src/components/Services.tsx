import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      title: "MVP Development",
      description: "Get your idea to market fast",
      price: "$5K – $25K",
      timeline: "4–12 weeks",
      cta: "Start MVP Quest"
    },
    {
      title: "Custom Web Apps",
      description: "Tailored solutions for your business", 
      price: "$10K – $50K",
      timeline: "8–24 weeks",
      cta: "Start Business Quest"
    },
    {
      title: "API Integration",
      description: "Connect your tools seamlessly",
      price: "$2K – $15K", 
      timeline: "2–8 weeks",
      cta: "Start Integration Quest"
    },
    {
      title: "Legacy Modernization",
      description: "Update old systems, no rewrite",
      price: "$15K – $75K",
      timeline: "12–36 weeks", 
      cta: "Start Epic Quest"
    }
  ];

  const openConsultationModal = (serviceType: string) => {
    // In a real app, this would open a modal with pre-filled service type
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-4">
            Choose Your Quest
          </h2>
          <p className="text-xl text-muted-foreground">
            Pick the mission that matches your goals and budget.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-surface group cursor-pointer hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-subsection text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-body text-muted-foreground mb-6">
                {service.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-small text-muted-foreground">Price Range:</span>
                  <span className="font-semibold text-primary">{service.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-muted-foreground">Timeline:</span>
                  <span className="font-semibold text-foreground">{service.timeline}</span>
                </div>
              </div>

              <Button 
                onClick={() => openConsultationModal(service.title)}
                className="btn-primary w-full group-hover:scale-105 transition-transform duration-200"
              >
                {service.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;