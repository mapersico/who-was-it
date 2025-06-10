import './layout.scss';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from "../../public/logo.webp";
import SearchWrapper from '../components/search-wrapper/search-wrapper';
import SearchTitle from '../components/search-title/search-title';
import Header from '../components/header/header';

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