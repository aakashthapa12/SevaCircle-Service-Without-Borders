import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "LOCAL SERVICING - Professional Home Services",
  description: "Reliable professional services for your home. Fast, safe, and affordable prices with verified professionals.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 font-sans">
        <LanguageProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
