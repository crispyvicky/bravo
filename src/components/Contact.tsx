import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
// import dynamic from 'next/dynamic';
// const DragExplodeHero = dynamic(() => import("@/components/DragExplodeHero"), { ssr: false });

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    projectType: "",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Form submission started:", formData);

      // 1. Send to WhatsApp
      const whatsappResponse = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile || undefined,
          projectType: formData.projectType,
          details: formData.details
        })
      });

      console.log("WhatsApp Response status:", whatsappResponse.status);

      if (!whatsappResponse.ok) {
        const data = await whatsappResponse.json().catch(() => ({}));
        console.error("WhatsApp API Error:", data);
        throw new Error(`${data?.error || "Failed to send message"}${data?.status ? ` (status ${data.status})` : ""}`);
      }

      // 2. Send Auto-reply Email (Fire and forget, or await if critical)
      // We don't want to block the success message if email fails, but logging is good.
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email
        })
      }).then(async (res) => {
        if (!res.ok) {
          console.error("Failed to send auto-reply email:", await res.json());
        } else {
          console.log("Auto-reply email sent successfully.");
        }
      }).catch(err => console.error("Error sending auto-reply email:", err));

      const responseData = await whatsappResponse.json();
      console.log("Success response:", responseData);

      toast({
        title: "Message sent ✅",
        description: "I'll reply within 24 hours on WhatsApp/email.",
      });

      setFormData({
        name: "",
        email: "",
        mobile: "",
        projectType: "",
        details: ""
      });
    } catch (err: any) {
      console.error("Form submission error:", err);
      toast({
        title: "Couldn't send message",
        description: err?.message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.projectType && formData.details;

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-section text-foreground mb-4">
            Ready to Conquer Your Next Boss?
          </h2>

          <p className="text-xl text-muted-foreground mb-12">
            Tell me about your mission and we'll craft the winning strategy.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Name, Email, and Mobile Row */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
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
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="+91 9143143143"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <input
                type="text"
                name="projectType"
                placeholder="Project Type (e.g., SaaS MVP)"
                value={formData.projectType}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            {/* Project Details */}
            <div>
              <textarea
                name="details"
                placeholder="Brief project outline"
                value={formData.details}
                onChange={handleInputChange}
                className="form-textarea"
                rows={4}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="btn-primary w-full h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Launching Quest..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;