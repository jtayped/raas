import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default RootProviders;
