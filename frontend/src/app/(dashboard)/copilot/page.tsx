"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Command, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopilotPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello. I am SentinelOps Copilot. I can help you analyze incidents, explain logs, generate runbooks, or check infrastructure health. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: "user", content: input }];
    setMessages(newMsgs);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMsgs, { 
        role: "assistant", 
        content: `I've analyzed your request regarding "${input}". Based on the current telemetry, everything seems stable. If you are investigating a specific issue, please provide the Incident ID or paste the logs.` 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[120px] rounded-full z-0 pointer-events-none" />

      <div className="p-4 border-b border-border/40 bg-background/80 backdrop-blur-md z-10 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AI Copilot</h1>
            <p className="text-xs text-muted-foreground">Your operational intelligence assistant</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 z-10 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-6 pb-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex space-x-4", msg.role === "user" ? "justify-end" : "justify-start")}>
              {msg.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center shrink-0 border border-purple-500/30">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              
              <div className={cn(
                "rounded-2xl px-5 py-3 max-w-[85%] text-sm leading-relaxed shadow-sm",
                msg.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-secondary/50 border border-border/50 text-foreground rounded-tl-sm glass-panel"
              )}>
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center shrink-0 border border-border/50">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border/40 z-10 shrink-0">
        <div className="max-w-4xl mx-auto relative">
          <form onSubmit={handleSend} className="relative flex items-center">
            <div className="absolute left-3 text-muted-foreground">
              <Sparkles className="h-5 w-5 text-purple-500/70" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Copilot to analyze an incident, summarize logs, or write a runbook..."
              className="w-full pl-10 pr-12 py-4 bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-sm"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-2 flex justify-center space-x-4 text-xs text-muted-foreground">
            <span className="flex items-center"><Command className="h-3 w-3 mr-1" /> Press Enter to send</span>
          </div>
        </div>
      </div>
    </div>
  );
}
