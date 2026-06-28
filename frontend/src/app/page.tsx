import Link from "next/link";
import { ArrowRight, Activity, Cpu, ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 blur-[120px] rounded-full z-0" />

      <header className="relative z-10 border-b border-border/40 glass-panel">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">SentinelOps</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/login" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          SentinelOps AI Copilot is now live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
          Enterprise Autonomous <br className="hidden md:block" /> Operations Intelligence
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Observe, analyze, automate, and resolve incidents faster than ever with AI-assisted infrastructure monitoring and runbook automation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/login" className="flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-primary/90 transition-all hover:scale-105">
            Launch Command Center
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="#demo" className="flex items-center justify-center bg-secondary text-secondary-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-secondary/80 transition-all border border-border">
            View Live Demo
          </Link>
        </div>
      </main>
      
      <div className="relative z-10 container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-xl flex flex-col items-start text-left">
            <div className="p-3 bg-primary/20 rounded-lg mb-4 text-primary">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Live Telemetry</h3>
            <p className="text-muted-foreground">Real-time metrics, logs, and distributed traces streamed via secure WebSockets.</p>
          </div>
          <div className="glass-panel p-6 rounded-xl flex flex-col items-start text-left">
            <div className="p-3 bg-purple-500/20 rounded-lg mb-4 text-purple-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Incident Mgmt</h3>
            <p className="text-muted-foreground">Automated root cause analysis and anomaly detection with Copilot.</p>
          </div>
          <div className="glass-panel p-6 rounded-xl flex flex-col items-start text-left">
            <div className="p-3 bg-cyan-500/20 rounded-lg mb-4 text-cyan-400">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Workflow Auto</h3>
            <p className="text-muted-foreground">Visual rule engine to automatically execute runbooks during critical alerts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
