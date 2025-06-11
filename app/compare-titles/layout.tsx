import './layout.scss';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from "../../public/logo.webp";
import SearchWrapper from '../components/search-wrapper/search-wrapper';
import SearchTitle from '../components/search-title/search-title';
import Header from '../components/header/header';

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

export default async function CompareTitlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='compare-titles-page -fadeIn'>
        <SearchWrapper>
          <Link href="/compare-titles">
            <Image priority src={Logo} alt="logo" width="200" height="150" />
          </Link>
          <Suspense>
            <SearchTitle />
            {children}
          </Suspense>
        </SearchWrapper>
      </div>
    </>
  );
}