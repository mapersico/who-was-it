import './layout.scss';
import SearchTitle from "../components/search-title/search-title";

export default function CompareTitlesLayout({ children }: { children: React.ReactNode, params: string }) {

  return (
    <div>
      <SearchTitle />
      {children}
    </div>
  );
}