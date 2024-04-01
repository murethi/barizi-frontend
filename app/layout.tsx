import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/navigation/navbar";
import {Toaster} from "@/components/ui/toaster";
import {ModalProvider} from "@/components/prodiders/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
      {children}
      <Toaster />
      <ModalProvider/>
      </body>
    </html>
  );
}
