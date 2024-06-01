import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "NOUxBASE",
  description:
    "NOU adaptation of the Pou game for Base Onchain Summer Competition using Thirdweb at it's max!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen max-h-screen h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThirdwebProvider>
          <Navbar />
          <main className="flex h-full border">{children}</main>
          <Toaster />
          <Footer />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
