"use client";

import { createContext, useContext, useState } from "react";
import { MediaItem } from "@/app/models/api.model";

interface TitleContextType {
  selectedTitles: MediaItem[];
  searchedTitles: MediaItem[];
  setSelectedTitles: (titles: MediaItem[]) => void;
  setSearchedTitles: (titles: MediaItem[]) => void;
}

const TitleContext = createContext<TitleContextType | null>(null);

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTitles, setSelectedTitles] = useState<MediaItem[]>([]);
  const [searchedTitles, setSearchedTitles] = useState<MediaItem[]>([]);

  return (
    <TitleContext.Provider
      value={{
        setSelectedTitles,
        setSearchedTitles,
        selectedTitles,
        searchedTitles,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};

export const useTitleContext = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("useTitleContext must be used within a TitleProvider");
  }
  return context;
};