import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TitleProvider } from "./hooks/useTitle/title.context";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const geistSans = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Who was it?!",
  description: "Compare the cast of movies and TV shows",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <Suspense>
          <TitleProvider>
            {children}
            <ToastContainer
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              position="bottom-center"
            />
          </TitleProvider>
        </Suspense>
      </body>
    </html>
  );
}
