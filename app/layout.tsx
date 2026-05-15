import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhishek Wayal | DevOps Engineer",
  description:
    "Portfolio of Abhishek Wayal, a DevOps Engineer focused on cloud-native infrastructure, CI/CD, Kubernetes, and observability across Azure and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} bg-charcoal font-mono text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
