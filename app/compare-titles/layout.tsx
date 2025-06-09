import './layout.scss';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from "../../public/logo.svg";
import TMDBLogo from "../../public/tmdb-logo.svg";
import SearchWrapper from '../components/search-wrapper/search-wrapper';

export default async function CompareTitlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='compare-titles-page -fadeIn'>
      <SearchWrapper>
        <Link href="/compare-titles">
          <Image priority src={Logo} alt="logo" width="200" height="180" />
        </Link>
        <Suspense>
          {children}
        </Suspense>
      </SearchWrapper>
      <p className="compare-titles-page_powered-by">
        Powered by
        <Image src={TMDBLogo} alt="tmdb" width="120" height="50" />
      </p>
    </div>
  );
}