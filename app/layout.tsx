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
  title: "Chandan Swarnakar | Frontend Developer",
  description:
    "Frontend Developer with 2+ years in React, Angular, and JavaScript. Building real-time, responsive web applications across healthcare, government, and ed-tech domains.",
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
