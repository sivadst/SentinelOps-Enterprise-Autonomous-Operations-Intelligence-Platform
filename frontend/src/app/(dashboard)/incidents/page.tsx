"use client";

import { ShieldAlert, CheckCircle2, Clock, Bot, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const mockIncidents = [
  { id: "INC-1042", title: "High latency on Payment API", status: "investigating", severity: "high", service: "payment-api", time: "10m ago", assignee: "AI Copilot" },
  { id: "INC-1041", title: "Database connection pool exhausted", status: "identified", severity: "critical", service: "pg-primary-01", time: "45m ago", assignee: "Jane Doe" },
  { id: "INC-1040", title: "Increased 5xx errors on auth service", status: "resolved", severity: "medium", service: "auth-service", time: "2h ago", assignee: "System" },
];

export default function IncidentsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incidents</h1>
          <p className="text-muted-foreground mt-1">Manage and resolve active system alerts</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors">
          Declare Incident
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-1 flex flex-col glass-panel rounded-xl border border-border/50 overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-secondary/30 shrink-0">
            <h3 className="font-medium">Active Queue</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {mockIncidents.map((inc) => (
              <div key={inc.id} className="p-4 rounded-lg border border-border/50 hover:bg-secondary/20 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{inc.id}</span>
                  <span className={cn(
                    "text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-sm",
                    inc.severity === "critical" ? "bg-destructive/20 text-destructive" :
                    inc.severity === "high" ? "bg-amber-500/20 text-amber-500" :
                    "bg-blue-500/20 text-blue-500"
                  )}>
                    {inc.severity}
                  </span>
                </div>
                <h4 className="font-medium text-sm mb-3 leading-snug">{inc.title}</h4>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {inc.time}</span>
                  <span>{inc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col glass-panel rounded-xl border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50 shrink-0 flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-amber-500/20 text-amber-500 text-xs uppercase tracking-wide font-bold px-2 py-1 rounded-sm">High</span>
                <span className="text-muted-foreground font-mono text-sm">INC-1042</span>
              </div>
              <h2 className="text-xl font-bold">High latency on Payment API</h2>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-border rounded-md text-sm transition-colors">Acknowledge</button>
              <button className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-md text-sm transition-colors">Resolve</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Status</p>
                <p className="text-sm font-medium">Investigating</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Service</p>
                <p className="text-sm font-medium text-primary">payment-api</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Assignee</p>
                <p className="text-sm font-medium flex items-center"><Bot className="h-3 w-3 mr-1 text-purple-500" /> AI Copilot</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Opened</p>
                <p className="text-sm font-medium">10 mins ago</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase text-muted-foreground">AI Copilot Analysis</h3>
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 relative">
                <Bot className="absolute top-4 right-4 h-5 w-5 text-purple-500/50" />
                <p className="text-sm leading-relaxed">
                  Based on recent telemetry, the <span className="text-primary font-mono bg-primary/10 px-1 rounded">payment-api</span> service is experiencing a 400% increase in response time (avg 2.4s). 
                  <br/><br/>
                  <strong>Root Cause Hypothesis:</strong> Correlated logs indicate the primary database connection pool is maxed out. 
                  This started exactly when the marketing team launched the new campaign 15 minutes ago.
                </p>
                
                <div className="mt-4 pt-4 border-t border-purple-500/10">
                  <p className="text-xs font-medium text-purple-400 mb-2">Recommended Actions:</p>
                  <div className="flex space-x-2 text-sm">
                    <button className="bg-secondary px-3 py-1.5 rounded-md hover:bg-secondary/80 transition-colors border border-border">Run Auto-Scaler</button>
                    <button className="bg-secondary px-3 py-1.5 rounded-md hover:bg-secondary/80 transition-colors border border-border">Restart Pods</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase text-muted-foreground">Timeline</h3>
              <div className="relative pl-4 border-l border-border/50 space-y-6">
                <div className="relative">
                  <div className="absolute -left-[21px] bg-background p-0.5 rounded-full"><Bot className="h-4 w-4 text-purple-500" /></div>
                  <p className="text-xs text-muted-foreground mb-1">2 mins ago</p>
                  <p className="text-sm">AI Copilot completed initial triage and suggested runbooks.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] bg-background p-0.5 rounded-full"><ShieldAlert className="h-4 w-4 text-amber-500" /></div>
                  <p className="text-xs text-muted-foreground mb-1">10 mins ago</p>
                  <p className="text-sm">Incident automatically created via Prometheus Alertmanager integration (Rule: API_HighLatency).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
