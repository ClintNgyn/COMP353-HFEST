"use client";

import { NextUIProvider } from "@nextui-org/react";

export default function ThemeProvider({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
