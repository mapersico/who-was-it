import './layout.scss';
import SearchTitle from "../components/search-title/search-title";
import { Suspense } from 'react';

export default function CompareTitlesLayout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <Suspense>
        <SearchTitle />
        {children}
      </Suspense>
    </div>
  );
}