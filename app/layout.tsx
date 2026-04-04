import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wilmer's Portfolio — Built for Speed",
  description: "Portfolio of Wilmer Iriarte, a Full-Stack Developer specializing in modern web applications, scalable architecture, and premium UI experiences.",
  keywords: ["Wilmer Iriarte", "Full-Stack Developer", "Software Engineer", "Next.js", "React", "Portfolio"],
  icons: {
    icon: "/bmw-tab.svg",
    shortcut: "/bmw-tab.svg",
    apple: "/bmw-tab.svg",
  },
  openGraph: {
    title: "Wilmer's Portfolio — Built for Speed",
    description: "Full-Stack Developer crafting high-performance, beautiful software.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col selection:bg-white/30 selection:text-white overflow-x-hidden">
        <div className="flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
