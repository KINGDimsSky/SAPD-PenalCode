import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata();

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
