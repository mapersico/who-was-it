import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TitleProvider } from "./hooks/useTitle/title.context";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import KofiWidget from "./components/ko-fi-widget/ko-fi-widget";

const geistSans = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Compare Titles | WhoWasIt",
  description: "Compare the cast of movies and TV shows with WhoWasIt!",
  openGraph: {
    title: "Compare TV and Movies Titles | Who Was It?!",
    description: "Compare the cast of movies and TV shows with WhoWasIt!",
    url: "https://whowasit.site/compare-titles",
    siteName: "Who Was It?!",
    images: [
      {
        url: "https://whowasit.site/logo.webp",
        width: 1200,
        height: 630,
        alt: "WhoWasIt Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare TV and Movies Titles | Who Was It?!",
    description: "Compare the cast of movies and TV shows with WhoWasIt!",
    images: ["https://whowasit.site/logo.webp"],
  },
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
        <KofiWidget />
      </body>
    </html>
  );
}
