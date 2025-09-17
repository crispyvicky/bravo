const Team = () => {
  return (
    <section id="team" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Founder Card */}
          <div className="card-surface max-w-md mx-auto lg:mx-0 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
               <img src="/founder/founder1.png" alt="Founder" className="w-24 h-24 rounded-full object-cover" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-2">
              vignesh yadav
            </h3>
            
            <p className="text-primary font-medium mb-4">
              Founder & Lead Engineer
            </p>
            
            <p className="text-small text-muted-foreground mb-6 leading-relaxed">
              Solo founder building Bravoo with a network of senior engineers from top tech 
              companies. You talk to me—always.
            </p>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Network Scaling Ready
            </div>
          </div>

          {/* Team Description */}
          <div className="space-y-8">
            <div>
              <h2 className="text-section text-foreground mb-6">
                Your Development Squad
              </h2>
              
              <p className="text-body text-muted-foreground mb-8">
                You get a dedicated senior engineer plus on-demand specialists—for database 
                tuning, mobile, or AI—when the project calls for it. Pay only for the skills 
                you actually need.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="text-success font-bold">✓</div>
                <span className="text-body">Direct Slack/WhatsApp access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-success font-bold">✓</div>
                <span className="text-body">Weekly playable demos</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-success font-bold">✓</div>
                <span className="text-body">No-nonsense reporting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;