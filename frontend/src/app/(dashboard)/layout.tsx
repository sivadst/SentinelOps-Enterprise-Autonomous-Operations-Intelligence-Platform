"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Activity, 
  LayoutDashboard, 
  Server, 
  ShieldAlert, 
  Terminal, 
  Workflow, 
  Bot,
  LogOut,
  Settings,
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, token } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  useEffect(() => {
    if (!token || !user) {
      router.push("/login");
    }
  }, [token, user, router]);

  if (!token || !user) return null; // Or a loading spinner

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Infrastructure", href: "/dashboard/infrastructure", icon: Server },
    { name: "Incidents", href: "/dashboard/incidents", icon: ShieldAlert },
    { name: "Logs", href: "/dashboard/logs", icon: Terminal },
    { name: "Automation", href: "/dashboard/automation", icon: Workflow },
    { name: "AI Copilot", href: "/dashboard/copilot", icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border/40 bg-card/50 backdrop-blur-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/40">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">SentinelOps</span>
          </Link>
          <button className="md:hidden text-muted-foreground" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-border/40">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer text-sm">
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user.full_name || user.email}</p>
              <p className="text-xs text-muted-foreground truncate">{user.is_superuser ? 'Admin' : 'Operator'}</p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full mt-2 flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-background/50 backdrop-blur-sm z-10 shrink-0">
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-1.5 border border-border rounded-md leading-5 bg-background/50 placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                placeholder="Search resources (⌘K)"
                type="search"
              />
            </div>
          </div>
          
          <div className="ml-4 flex items-center md:ml-6 space-x-3">
            <button className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/80 focus:outline-none transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
            </button>
            <button className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/80 focus:outline-none transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
