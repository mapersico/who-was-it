import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Titles | WhoWasIt",
  description: "Compare the cast of movies and TV shows with WhoWasIt!",
  openGraph: {
    title: "Compare TV and Movies Titles | WhoWasIt",
    description: "Compare the cast of movies and TV shows with WhoWasIt!",
    url: "https://whowasit.site/compare-titles",
    siteName: "WhoWasIt",
    images: [
      {
        url: "https://whowasit.site/logo.svg",
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
    title: "Compare TV and Movies Titles | WhoWasIt",
    description: "Compare the cast of movies and TV shows with WhoWasIt!",
    images: ["https://whowasit.site/logo.svg"],
  },
};
