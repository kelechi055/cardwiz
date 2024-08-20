import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Hanken_Grotesk({ subsets: ["latin"] });

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
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
