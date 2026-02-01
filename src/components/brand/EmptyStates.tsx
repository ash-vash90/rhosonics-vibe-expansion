import { FileQuestion, Search, Bell, Database, Inbox, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandCallout } from "./BrandCallout";

/**
 * Empty States Pattern
 * 
 * Documents the 4-part anatomy of empty states:
 * 1. Icon - Relevant to the missing content
 * 2. Title - What's missing
 * 3. Description - Why it's empty or how to fix
 * 4. Action - Clear next step
 */
export const EmptyStates = () => {
  const examples = [
    {
      icon: Inbox,
      title: "No messages yet",
      description: "When you receive notifications, they'll appear here.",
      action: "Configure Alerts",
      context: "Notifications panel",
    },
    {
      icon: Database,
      title: "No readings recorded",
      description: "Connect your SDM Eco to start capturing density measurements.",
      action: "Connect Device",
      context: "Dashboard on first use",
    },
    {
      icon: Search,
      title: "No results found",
      description: "Try adjusting your filters or search terms.",
      action: "Clear Filters",
      context: "Search with no matches",
    },
  ];

  return (
    <section className="space-y-16 pt-16">
      {/* Hero Statement */}
      <div>
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-6">Empty States</h2>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Empty states are the first impression for new users. They should guide, 
          not frustrate. A well-designed empty state turns confusion into action.
        </p>
      </div>

      {/* Anatomy */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">01</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Anatomy</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Visual breakdown */}
          <div className="p-8 bg-muted/30 border border-border rounded-lg">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* 1. Icon */}
              <div className="relative">
                <div className="p-4 bg-primary/10 rounded-full border border-primary/20">
                  <FileQuestion className="w-8 h-8 text-primary" />
                </div>
                <span className="absolute -right-16 top-1/2 -translate-y-1/2 font-data text-xs text-primary bg-primary/10 px-2 py-1 rounded">1. Icon</span>
              </div>
              
              {/* 2. Title */}
              <div className="relative">
                <h4 className="font-ui text-xl font-semibold text-foreground">No data available</h4>
                <span className="absolute -right-16 top-1/2 -translate-y-1/2 font-data text-xs text-primary bg-primary/10 px-2 py-1 rounded whitespace-nowrap">2. Title</span>
              </div>
              
              {/* 3. Description */}
              <div className="relative max-w-xs">
                <p className="text-muted-foreground">Start by connecting your measurement device to begin capturing readings.</p>
                <span className="absolute -right-20 top-1/2 -translate-y-1/2 font-data text-xs text-primary bg-primary/10 px-2 py-1 rounded whitespace-nowrap">3. Description</span>
              </div>
              
              {/* 4. Action */}
              <div className="relative pt-2">
                <Button variant="default">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect Device
                </Button>
                <span className="absolute -right-16 top-1/2 -translate-y-1/2 font-data text-xs text-primary bg-primary/10 px-2 py-1 rounded">4. Action</span>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="space-y-6">
            <div className="p-4 border-l-2 border-primary bg-muted/20 rounded-r-lg">
              <span className="font-data text-xs text-primary uppercase tracking-wider block mb-2">Icon</span>
              <p className="text-muted-foreground">Choose an icon that represents the missing content, not the action. Use muted colors to avoid drawing too much attention.</p>
            </div>
            
            <div className="p-4 border-l-2 border-primary bg-muted/20 rounded-r-lg">
              <span className="font-data text-xs text-primary uppercase tracking-wider block mb-2">Title</span>
              <p className="text-muted-foreground">State what's missing clearly. "No results" is better than "Oops!" Keep it factual, not cute.</p>
            </div>
            
            <div className="p-4 border-l-2 border-primary bg-muted/20 rounded-r-lg">
              <span className="font-data text-xs text-primary uppercase tracking-wider block mb-2">Description</span>
              <p className="text-muted-foreground">Explain why or how to fix it. One or two sentences max. Don't lecture.</p>
            </div>
            
            <div className="p-4 border-l-2 border-primary bg-muted/20 rounded-r-lg">
              <span className="font-data text-xs text-primary uppercase tracking-wider block mb-2">Action</span>
              <p className="text-muted-foreground">A single, clear button. Use action verbs: "Add", "Connect", "Create". Never "OK" or "Got it".</p>
            </div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">02</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Examples</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((example) => (
            <div key={example.title} className="p-6 bg-muted/20 border border-border rounded-lg">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wider block mb-4">{example.context}</span>
              
              <div className="flex flex-col items-center text-center space-y-4 py-8">
                <div className="p-3 bg-muted rounded-full">
                  <example.icon className="w-6 h-6 text-muted-foreground" />
                </div>
                <h4 className="font-ui font-semibold text-foreground">{example.title}</h4>
                <p className="text-sm text-muted-foreground max-w-xs">{example.description}</p>
                <Button variant="outline" size="sm">{example.action}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Do / Don't */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">03</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Do / Don't</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Do */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-primary">✓</span>
              <span className="font-data text-xs text-primary uppercase tracking-wider">Do</span>
            </div>
            <div className="p-6 bg-eco-surface border border-eco-border rounded-lg">
              <div className="flex flex-col items-center text-center space-y-3 py-4">
                <Bell className="w-8 h-8 text-muted-foreground" />
                <h4 className="font-ui font-semibold text-foreground">No alerts configured</h4>
                <p className="text-sm text-muted-foreground">Set up alerts to get notified when readings exceed thresholds.</p>
                <Button variant="default" size="sm">Configure Alerts</Button>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                Clear, factual title
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                Helpful description
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                Actionable button with verb
              </li>
            </ul>
          </div>

          {/* Don't */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-destructive">✕</span>
              <span className="font-data text-xs text-destructive uppercase tracking-wider">Don't</span>
            </div>
            <div className="p-6 bg-error-surface border border-error-border rounded-lg">
              <div className="flex flex-col items-center text-center space-y-3 py-4">
                <span className="text-4xl">🤷</span>
                <h4 className="font-ui font-semibold text-foreground">Oops! Nothing here!</h4>
                <p className="text-sm text-muted-foreground">Looks like you haven't done anything yet. Maybe try clicking around?</p>
                <Button variant="outline" size="sm">OK</Button>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                Cutesy, unhelpful title
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                Vague, patronizing description
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                Dead-end button
              </li>
            </ul>
          </div>
        </div>
      </div>

      <BrandCallout variant="best" title="The Dead End Test">
        If clicking the empty state's button doesn't lead to a clear next step, the empty state has failed. 
        Every empty state must have an escape route.
      </BrandCallout>
    </section>
  );
};

export default EmptyStates;
