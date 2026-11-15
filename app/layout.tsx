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
    "Frontend Developer with nearly 3 years of experience building production React, Next.js, Angular, and TypeScript applications across healthcare, ed-tech, government, and SaaS domains.",
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
