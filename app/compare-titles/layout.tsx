import './layout.scss';
import SearchTitle from "../components/search-title/search-title";
import { Suspense } from 'react';
import Image from 'next/image';

import Logo from "../../public/logo.svg";
import TMDBLogo from "../../public/tmdb-logo.svg";

export default async function CompareTitlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='-fadeIn'>
      <Suspense>
        <SearchTitle
          header={(
            <>
              <Image src={Logo} alt="logo" width="225" height="225" />
              <p>Compare the cast of movies and TV shows</p>
            </>
          )}
        />
        {children}
      </Suspense>
      <p className="compare-titles-page_powered-by">
        Powered by
        <Image src={TMDBLogo} alt="tmdb" width="120" height="50" />
      </p>
    </div>
  );
}