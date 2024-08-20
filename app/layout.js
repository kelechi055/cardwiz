import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CardWiz",
  description: "Your Best Studying Companion",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="/cardwizard.png" />
        </Head>
        <body className={inter.className}>
          {children}
          <Analytics /> 
        </body>
      </html>
    </ClerkProvider>
  );
}