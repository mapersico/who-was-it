"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

import { useTitleContext } from "@/app/hooks/useTitle/title.context";
import { TitlePicker } from "../title-picker/title-picker";

import './search-title.scss';
import { MediaItem } from "@/app/models/api.model";

const SearchTitle = () => {
  const searchParams = useSearchParams();
  const { selectedTitles, setSelectedTitles } = useTitleContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const titles = searchParams.get("titles")?.toString() || "";
      const decompressedTitles = decompressFromEncodedURIComponent(titles);
      setSelectedTitles(JSON.parse(decompressedTitles) || []);
    } catch {
      router.push("/compare-titles");
      setSelectedTitles([]);
    }
  }, [router, searchParams, setSelectedTitles]);

  const handleUrlRedirect = (path: string, titleToExclude?: MediaItem) => {
    const compressedTitles = compressToEncodedURIComponent(JSON.stringify(selectedTitles.filter((title) => title.id !== titleToExclude?.id)));
    router.push(`${path}?titles=${compressedTitles}`);
  }

  return (
    <>
      <p>Compare the cast of movies and TV shows</p>
      <TitlePicker onTitleRemoved={(item) => handleUrlRedirect("/compare-titles", item)} />
      <div className="compare-titles-page_actions">
        {selectedTitles.length === 2 && !pathname.includes("/results") && (
          <button onClick={() => handleUrlRedirect("/compare-titles/results")} className="compare-titles-page_action">
            Compare
          </button>
        )}
      </div>
    </>
  );
}

export default SearchTitle;