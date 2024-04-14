import { Inter } from "next/font/google";

import ReduxProvider from "#/components/providers/ReduxProvider";
import ThemeProvider from "#/components/providers/ThemeProvider";
import ToastProvider from "#/components/providers/ToastProvider";

import Sidebar from "#/components/layouts/Sidebar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HFESTS",
  description: "System to keep track of heath care professionals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider>
            <ToastProvider>
              <div className="h-full w-full flex">
                <Sidebar className="w-1/5 h-screen flex flex-col items-center justify-center py-2" />
                <main className="w-4/5 min-h-screen">{children}</main>
              </div>
            </ToastProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
