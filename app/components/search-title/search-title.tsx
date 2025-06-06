"use client";

import { useEffect } from "react";
import Image from "next/image";

import { useTitleContext } from "@/app/hooks/useTitle/title.context";

import './search-title.scss';

import Logo from "../../../public/logo.svg";
import { TitlePicker } from "../title-picker/title-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchTitle = () => {
  const searchParams = useSearchParams();
  const { selectedTitles, setSelectedTitles } = useTitleContext();
  const router = useRouter();
  const pathname = usePathname();
  const host = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    try {
      const titles = atob(searchParams.get("titles")?.toString() || "")
      setSelectedTitles(JSON.parse(titles));
    } catch {
      router.push("/compare-titles");
      setSelectedTitles([]);
    }
  }, [router, searchParams, setSelectedTitles]);

  return (
    <div className={`compare-titles-page_header top-results -fadeIn ${pathname === "/compare-titles" ? "top-blank" : ""}`}>
      <Image src={Logo} alt="logo" width="225" height="225" />
      <p>Compare the cast of movies and TV shows</p>
      <TitlePicker onTitleRemoved={(item) => router.push(`/compare-titles?titles=${btoa(JSON.stringify(selectedTitles.filter((title) => title.id !== item.id)))}`)} />
      <div className="compare-titles-page_actions">
        {selectedTitles.length === 2 && !pathname.includes("/results") && <button onClick={() => router.push(`/compare-titles/results?titles=${btoa(JSON.stringify(selectedTitles))}`)} className="compare-titles-page_action">
          Compare
        </button>}
        {pathname === "/compare-titles/results" &&
          <button onClick={() => navigator.clipboard.writeText(`${host}/compare-titles/results?titles=${btoa(JSON.stringify(selectedTitles))}`)} className="compare-titles-page_action">
            Share
          </button>
        }
      </div>
      <p className="compare-titles-page_powered-by">
        Powered by TMDB
      </p>
    </div>
  );
}

export default SearchTitle;