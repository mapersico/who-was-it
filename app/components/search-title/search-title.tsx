"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

import { useTitleContext } from "@/app/hooks/useTitle/title.context";
import { TitlePicker } from "../title-picker/title-picker";

import './search-title.scss';
import { MediaItem } from "@/app/models/api.model";

interface SearchTitleProps {
  header: ReactNode;
}

const SearchTitle = ({
  header
}: SearchTitleProps) => {
  const searchParams = useSearchParams();
  const { selectedTitles, searchedTitles, setSelectedTitles } = useTitleContext();
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

  const handleCopyUrl = async () => {
    const compressedTitles = compressToEncodedURIComponent(JSON.stringify(selectedTitles));
    await navigator.clipboard.writeText(`${window.location.origin}/compare-titles/results?titles=${compressedTitles}`);
  }

  return (
    <div className={`compare-titles-page_header -fadeIn top-blank ${(selectedTitles.length || searchedTitles.length) ? "top-results" : ""}`}>
      {header}
      <TitlePicker onTitleRemoved={(item) => handleUrlRedirect("/compare-titles", item)} />
      <div className="compare-titles-page_actions">
        {selectedTitles.length === 2 && !pathname.includes("/results") && (
          <button onClick={() => handleUrlRedirect("/compare-titles/results")} className="compare-titles-page_action">
            Compare
          </button>
        )}
        {(pathname === "/compare-titles/results" && selectedTitles.length)
          ? (
            <button
              onClick={handleCopyUrl}
              className="compare-titles-page_action"
            >
              Share
            </button>
          ) : null
        }
      </div>
    </div>
  );
}

export default SearchTitle;