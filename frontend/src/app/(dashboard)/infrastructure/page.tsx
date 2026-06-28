"use client";

import { useState } from "react";
import { Server, Database, Boxes, LayoutGrid, List as ListIcon, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const mockNodes = [
  { id: "node-1", name: "api-gateway-prod-01", type: "container", status: "online", cpu: 45, mem: 60, region: "us-east-1" },
  { id: "node-2", name: "api-gateway-prod-02", type: "container", status: "online", cpu: 42, mem: 58, region: "us-east-1" },
  { id: "node-3", name: "auth-service-01", type: "container", status: "degraded", cpu: 92, mem: 85, region: "us-west-2" },
  { id: "node-4", name: "pg-primary-01", type: "database", status: "online", cpu: 25, mem: 40, region: "us-east-1" },
  { id: "node-5", name: "redis-cache-01", type: "cache", status: "online", cpu: 15, mem: 95, region: "us-east-1" },
  { id: "node-6", name: "worker-node-x1", type: "server", status: "offline", cpu: 0, mem: 0, region: "eu-central-1" },
];

export default function InfrastructurePage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Infrastructure</h1>
          <p className="text-muted-foreground mt-1">Monitor servers, containers, and databases</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <div className="bg-secondary/50 rounded-md p-1 border border-border/50 flex items-center">
            <button 
              onClick={() => setView("grid")}
              className={cn("p-1.5 rounded-sm transition-colors", view === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setView("list")}
              className={cn("p-1.5 rounded-sm transition-colors", view === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-secondary/30 border border-border/50 rounded-full px-4 py-1.5 text-sm font-medium flex items-center cursor-pointer hover:bg-secondary/50 transition-colors">
          <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
          Online (138)
        </div>
        <div className="bg-secondary/30 border border-border/50 rounded-full px-4 py-1.5 text-sm font-medium flex items-center cursor-pointer hover:bg-secondary/50 transition-colors">
          <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
          Degraded (3)
        </div>
        <div className="bg-secondary/30 border border-border/50 rounded-full px-4 py-1.5 text-sm font-medium flex items-center cursor-pointer hover:bg-secondary/50 transition-colors">
          <span className="h-2 w-2 rounded-full bg-destructive mr-2"></span>
          Offline (1)
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockNodes.map((node) => (
            <div key={node.id} className="glass-panel p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    node.type === "server" ? "bg-blue-500/10 text-blue-500" :
                    node.type === "database" ? "bg-purple-500/10 text-purple-500" :
                    node.type === "container" ? "bg-cyan-500/10 text-cyan-500" : "bg-orange-500/10 text-orange-500"
                  )}>
                    {node.type === "server" ? <Server className="h-5 w-5" /> : 
                     node.type === "database" ? <Database className="h-5 w-5" /> : 
                     <Boxes className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{node.name}</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{node.type} • {node.region}</p>
                  </div>
                </div>
                <div className={cn(
                  "h-2.5 w-2.5 rounded-full mt-1",
                  node.status === "online" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                  node.status === "degraded" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse" :
                  "bg-destructive"
                )} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">CPU</span>
                    <span className={node.cpu > 80 ? "text-amber-500 font-medium" : ""}>{node.cpu}%</span>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-1.5">
                    <div 
                      className={cn("h-1.5 rounded-full", node.cpu > 80 ? "bg-amber-500" : "bg-primary")} 
                      style={{ width: `${node.cpu}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Memory</span>
                    <span className={node.mem > 90 ? "text-destructive font-medium" : ""}>{node.mem}%</span>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-1.5">
                    <div 
                      className={cn("h-1.5 rounded-full", node.mem > 90 ? "bg-destructive" : "bg-primary")} 
                      style={{ width: `${node.mem}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-xl border border-border/50 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Node</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Region</th>
                <th className="px-6 py-4 font-medium">CPU</th>
                <th className="px-6 py-4 font-medium">Memory</th>
              </tr>
            </thead>
            <tbody>
              {mockNodes.map((node) => (
                <tr key={node.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center space-x-3">
                    <div className={cn(
                      "p-1.5 rounded-md",
                      node.type === "server" ? "bg-blue-500/10 text-blue-500" :
                      node.type === "database" ? "bg-purple-500/10 text-purple-500" :
                      node.type === "container" ? "bg-cyan-500/10 text-cyan-500" : "bg-orange-500/10 text-orange-500"
                    )}>
                      {node.type === "server" ? <Server className="h-4 w-4" /> : 
                       node.type === "database" ? <Database className="h-4 w-4" /> : 
                       <Boxes className="h-4 w-4" />}
                    </div>
                    <span>{node.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                      node.status === "online" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      node.status === "degraded" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                      "bg-destructive/10 text-destructive border-destructive/20"
                    )}>
                      {node.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{node.region}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-secondary/50 rounded-full h-1.5">
                        <div className={cn("h-1.5 rounded-full", node.cpu > 80 ? "bg-amber-500" : "bg-primary")} style={{ width: `${node.cpu}%` }} />
                      </div>
                      <span className="text-xs">{node.cpu}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-secondary/50 rounded-full h-1.5">
                        <div className={cn("h-1.5 rounded-full", node.mem > 90 ? "bg-destructive" : "bg-primary")} style={{ width: `${node.mem}%` }} />
                      </div>
                      <span className="text-xs">{node.mem}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
