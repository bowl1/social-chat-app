"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/AppStyle";
import { theme } from "../styles/theme";
import { useUserStore } from "../store/useUserStore";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const startAuthListener = useUserStore((s) => s.startAuthListener);

  useEffect(() => {
    const unsub = startAuthListener();
    return () => {
      if (unsub) unsub();
    };
  }, [startAuthListener]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
