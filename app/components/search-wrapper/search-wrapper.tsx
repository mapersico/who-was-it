"use client";

import { useTitleContext } from "@/app/hooks/useTitle/title.context";

import '../search-title/search-title.scss';
import { useSearchParams } from "next/navigation";

export default function SearchWrapper({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();
  const { selectedTitles, searchedTitles } = useTitleContext();
  const titlesFromQuery = new URLSearchParams(params).get("titles");

  return (
    <div className={`compare-titles-page_header -fadeIn top-blank ${(selectedTitles.length || searchedTitles.length || titlesFromQuery) ? "top-results" : "top-blank"}`}>
      {children}
    </div>
  );
}