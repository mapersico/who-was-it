import { Suspense } from "react";

export const metadata = {
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

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      {children}
    </Suspense>
  );
}