import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoWork - Sistema de Reservas",
  description: "Dashboard de administracion para sistema de coworking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full">
        <Sidebar />
        <main className="ml-64 min-h-screen bg-background p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
