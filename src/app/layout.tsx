import type { Metadata } from "next";
import "./globals.css";
import UserInputDataContextProvider from "@/contexts/UserInputContext";

export const metadata: Metadata = {
  title: "Calculator",
  description: "Sangfor Sase ROI Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main>
          <UserInputDataContextProvider>
            {children}
          </UserInputDataContextProvider>
        </main>
      </body>
    </html>
  );
}
