"use client";

import { useState, useEffect } from "react";
import { Activity, Server, Cpu, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data for initial layout testing
  const cpuData = [
    { time: '00:00', value: 45 },
    { time: '04:00', value: 55 },
    { time: '08:00', value: 85 },
    { time: '12:00', value: 65 },
    { time: '16:00', value: 75 },
    { time: '20:00', value: 50 },
    { time: '24:00', value: 45 },
  ];

  if (!mounted) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground mt-1">Live overview of your infrastructure health</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2 bg-secondary/30 px-3 py-1.5 rounded-md border border-border/50 text-sm">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium">System Status: Healthy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-border/50">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Global Health Score</p>
              <h3 className="text-2xl font-bold mt-1">98.4%</h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-emerald-500 mt-4 flex items-center">
            <Activity className="h-3 w-3 mr-1" /> +0.2% from last hour
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-border/50">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Incidents</p>
              <h3 className="text-2xl font-bold mt-1">2</h3>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-amber-500 mt-4 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" /> 1 high severity
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-border/50">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Nodes</p>
              <h3 className="text-2xl font-bold mt-1">142</h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <Server className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 flex items-center">
            <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" /> 138 online
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-border/50">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg CPU Usage</p>
              <h3 className="text-2xl font-bold mt-1">62%</h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
              <Cpu className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 flex items-center">
            <Activity className="h-3 w-3 mr-1 text-primary" /> Spiked 10m ago
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-border/50">
          <h3 className="text-lg font-semibold mb-6">Cluster CPU Utilization</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217.2 91.2% 59.8%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(217.2 91.2% 59.8%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '0.5rem' }}
                  itemStyle={{ color: 'var(--color-primary)' }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-border/50 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
          <div className="flex-1 space-y-4">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-primary mb-1">Anomaly Detected</h4>
              <p className="text-xs text-muted-foreground">Payment API latency increased by 40% in the last 15 minutes. Investigating database connections.</p>
            </div>
            <div className="bg-secondary/50 border border-border/50 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-1">Cost Optimization</h4>
              <p className="text-xs text-muted-foreground">3 worker nodes in us-east-1 have been idle for &gt;48 hours. Consider downscaling.</p>
            </div>
            <div className="bg-secondary/50 border border-border/50 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-1">Security Recommendation</h4>
              <p className="text-xs text-muted-foreground">Update available for Redis cluster. Impact risk is low, scheduled for next maintenance window.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
