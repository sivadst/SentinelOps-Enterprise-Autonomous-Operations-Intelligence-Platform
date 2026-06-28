import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SentinelOps | Operations Intelligence",
  description: "Enterprise Autonomous Operations Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen antialiased bg-background text-foreground selection:bg-primary/30`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
