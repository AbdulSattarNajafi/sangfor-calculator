import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import UserInputDataContextProvider from "@/contexts/UserInputContext";
import Main from "@/components/Main";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sase ROI Calculator Calculator",
  description: "Sangfor Sase ROI Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.variable}`}>
        <UserInputDataContextProvider>
          <Main>{children}</Main>
        </UserInputDataContextProvider>
      </body>
    </html>
  );
}
