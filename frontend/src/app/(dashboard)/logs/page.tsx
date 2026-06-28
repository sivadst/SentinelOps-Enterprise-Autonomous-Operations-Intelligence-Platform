"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Search, Filter, Play, Pause, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_LOGS = [
  { id: 1, time: "2026-06-28T04:22:15.000Z", service: "api-gateway", level: "INFO", message: "Request processed successfully (200 OK)" },
  { id: 2, time: "2026-06-28T04:22:14.230Z", service: "payment-api", level: "WARN", message: "Connection pool utilization at 85%" },
  { id: 3, time: "2026-06-28T04:22:13.100Z", service: "auth-service", level: "INFO", message: "User session validated" },
  { id: 4, time: "2026-06-28T04:22:12.050Z", service: "payment-api", level: "ERROR", message: "Timeout waiting for database connection" },
  { id: 5, time: "2026-06-28T04:22:11.800Z", service: "api-gateway", level: "INFO", message: "Routing request to payment-api" },
  { id: 6, time: "2026-06-28T04:22:10.000Z", service: "pg-primary-01", level: "WARN", message: "Slow query detected (duration: 1.2s)" },
];

export default function LogsPage() {
  const [isLive, setIsLive] = useState(true);
  const [search, setSearch] = useState("");
  const endOfLogsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLive && endOfLogsRef.current) {
      endOfLogsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLive]);

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center shrink-0 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Log Explorer</h1>
          <p className="text-muted-foreground mt-1">Live streaming and analysis of distributed logs</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col glass-panel rounded-xl border border-border/50 overflow-hidden min-h-0">
        <div className="p-4 border-b border-border/50 bg-secondary/30 shrink-0 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search logs (regex supported)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            <button className="p-2 border border-border rounded-md hover:bg-secondary transition-colors text-muted-foreground">
              <Filter className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Level:</span>
              <select className="bg-background/50 border border-border rounded-md px-2 py-1 text-sm focus:outline-none">
                <option>All</option>
                <option>ERROR</option>
                <option>WARN</option>
                <option>INFO</option>
              </select>
            </div>
            
            <button 
              onClick={() => setIsLive(!isLive)}
              className={cn(
                "flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors border",
                isLive 
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20" 
                  : "bg-secondary text-foreground border-border hover:bg-secondary/80"
              )}
            >
              {isLive ? <Pause className="h-4 w-4 mr-1.5" /> : <Play className="h-4 w-4 mr-1.5" />}
              {isLive ? "Pause Stream" : "Resume"}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#0d1117] font-mono text-sm p-4 relative">
          {!isLive && (
            <div className="sticky top-0 left-0 right-0 bg-amber-500/10 border border-amber-500/20 text-amber-500 p-2 rounded flex justify-center items-center text-xs backdrop-blur-sm z-10">
              Stream paused. Showing historical logs.
            </div>
          )}
          
          <div className="space-y-1.5">
            {MOCK_LOGS.map((log) => (
              <div key={log.id} className="flex group hover:bg-white/5 py-1 px-2 rounded -mx-2 transition-colors cursor-text">
                <div className="w-48 shrink-0 text-muted-foreground opacity-60">
                  {new Date(log.time).toISOString().replace('T', ' ').replace('Z', '')}
                </div>
                <div className="w-32 shrink-0">
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider",
                    log.level === "ERROR" ? "bg-destructive/20 text-red-400" :
                    log.level === "WARN" ? "bg-amber-500/20 text-amber-400" :
                    "bg-blue-500/20 text-blue-400"
                  )}>
                    {log.level}
                  </span>
                </div>
                <div className="w-32 shrink-0 text-primary/80 truncate pr-4" title={log.service}>
                  [{log.service}]
                </div>
                <div className={cn(
                  "flex-1 break-all",
                  log.level === "ERROR" ? "text-red-300 font-medium" : "text-gray-300"
                )}>
                  {log.message}
                </div>
              </div>
            ))}
            <div ref={endOfLogsRef} />
          </div>
        </div>
        
        <div className="p-3 border-t border-border/50 bg-secondary/30 flex justify-between items-center text-xs text-muted-foreground shrink-0">
          <div className="flex items-center">
            <Terminal className="h-4 w-4 mr-2" />
            Connected to log stream
          </div>
          <div>6 lines shown</div>
        </div>
      </div>
    </div>
  );
}
