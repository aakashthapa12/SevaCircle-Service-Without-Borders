import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ToastProvider } from "@/components/ui/ToastProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import AuthGuard from "@/components/AuthGuard";
import "@/utils/authDebug"; // Import auth debugging utilities

// Inter for body text - optimal readability
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Poppins for headings - modern and professional
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen w-full">
              <AuthGuard>
                <ConditionalLayout>
                  {children}
                </ConditionalLayout>
              </AuthGuard>
            </div>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
