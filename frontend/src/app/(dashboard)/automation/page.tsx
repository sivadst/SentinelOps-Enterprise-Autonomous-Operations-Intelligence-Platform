"use client";

import { Workflow, Plus, Play, Clock, Webhook, FileJson } from "lucide-react";

export default function AutomationPage() {
  const workflows = [
    { id: 1, name: "Auto-scale API Gateway", trigger: "Alert: High CPU", actions: 2, status: "active", lastRun: "2h ago" },
    { id: 2, name: "Restart Dead Workers", trigger: "Schedule: Every 5m", actions: 1, status: "active", lastRun: "1m ago" },
    { id: 3, name: "Clear Redis Cache", trigger: "Webhook", actions: 3, status: "paused", lastRun: "2d ago" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automation</h1>
          <p className="text-muted-foreground mt-1">Build and manage operational workflows</p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workflows.map((wf) => (
          <div key={wf.id} className="glass-panel p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-colors flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Workflow className="h-5 w-5" />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${wf.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-secondary text-muted-foreground border-border'}`}>
                {wf.status}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg mb-1">{wf.name}</h3>
            
            <div className="flex-1 mt-4 space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                {wf.trigger.startsWith('Alert') ? <AlertCircle className="h-4 w-4 mr-2" /> :
                 wf.trigger.startsWith('Schedule') ? <Clock className="h-4 w-4 mr-2" /> :
                 <Webhook className="h-4 w-4 mr-2" />}
                <span className="font-medium text-foreground">{wf.trigger}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <FileJson className="h-4 w-4 mr-2" />
                <span>{wf.actions} actions configured</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Last run: {wf.lastRun}</span>
              <button className="text-primary hover:underline font-medium">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dummy component since we didn't import AlertCircle at the top
function AlertCircle({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
}
