import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const StartQuest = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    questType: "",
    missionDetails: "",
    budgetRange: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questTypes = [
    "MVP Development",
    "Web Application", 
    "Mobile App",
    "AI/ML Integration",
    "Legacy Modernization",
    "API Development",
    "UI/UX Design",
    "Other"
  ];

  const budgetRanges = [
    "$5K-15K",
    "$15K-50K", 
    "$50K+",
    "Not Sure Yet"
  ];

  const timelines = [
    "Urgent (1-2 months)",
    "Normal (2-3 months)",
    "Flexible (3-6 months)",
    "Planning Phase"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "🚀 Quest Received!",
        description: "Your mission details are secure. I'll respond within 24 hours with a battle plan and next steps.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        questType: "",
        missionDetails: "",
        budgetRange: "",
        timeline: ""
      });
    }, 2000);
  };

  const isFormValid = formData.name && formData.email && formData.questType && formData.missionDetails;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-hero text-foreground mb-4 animate-fade-in">
                Ready to Start Your Quest?
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in-delay">
                Tell me about your mission. I'll craft the winning strategy.
              </p>
            </div>

            {/* Trust Signals */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-sm font-medium text-foreground">24-hour response guaranteed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <div className="text-sm font-medium text-foreground">Your mission details stay confidential</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <div className="text-sm font-medium text-foreground">Direct WhatsApp/Slack access after signup</div>
              </div>
            </div>

            {/* Quest Form */}
            <div className="card-surface max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {/* Quest Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quest Type *
                  </label>
                  <select
                    name="questType"
                    value={formData.questType}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select your mission type</option>
                    {questTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Budget and Timeline Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mission Details */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mission Details *
                  </label>
                  <textarea
                    name="missionDetails"
                    placeholder="Describe your project, the problem you're solving, and what success looks like..."
                    value={formData.missionDetails}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows={5}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="btn-hero w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Preparing Battle Plan..." : "Launch Quest ⚔️"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* What Happens Next */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-section text-foreground mb-4">
                What Happens Next?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="card-surface">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Step 1: Response
                  </h3>
                  <p className="text-body text-muted-foreground">
                    I'll email you within 24 hours with initial thoughts and clarifying questions.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="card-surface">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Step 2: Strategy Call
                  </h3>
                  <p className="text-body text-muted-foreground">
                    30-minute call to understand your vision and craft the battle plan.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="card-surface">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Step 3: Launch
                  </h3>
                  <p className="text-body text-muted-foreground">
                    We agree on scope, timeline, and budget. Then we start building.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-section text-foreground mb-4">
                Common Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="card-surface">
                <h3 className="font-semibold text-foreground mb-2">
                  How much does it cost to get started?
                </h3>
                <p className="text-body text-muted-foreground">
                  The consultation and project planning are completely free. You only pay when we agree to work together.
                </p>
              </div>

              <div className="card-surface">
                <h3 className="font-semibold text-foreground mb-2">
                  Do you work with all budget ranges?
                </h3>
                <p className="text-body text-muted-foreground">
                  I focus on projects $5K+. For smaller needs, I can recommend tools or junior developers from my network.
                </p>
              </div>

              <div className="card-surface">
                <h3 className="font-semibold text-foreground mb-2">
                  What if my project needs skills you don't have?
                </h3>
                <p className="text-body text-muted-foreground">
                  That's where the guild comes in. I have a network of specialists for AI, mobile, design, and more. You still work with me directly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StartQuest;