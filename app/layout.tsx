import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HireNote",
  description: "Generate professional messages in seconds.",
};

import { ThemeProvider } from "@/hooks/useTheme";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen" suppressHydrationWarning={true}>
        <ThemeProvider defaultTheme="system" storageKey="hirenote:theme">
          {children}
          <Toaster position="bottom-center" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
