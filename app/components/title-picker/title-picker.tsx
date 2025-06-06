"use client"

import './title-picker.scss';
import { useTitleContext } from '@/app/hooks/useTitle/title.context';

import DebouncedInput from "../debounced-input/debounced-input";
import TitleItem from '../title-item/title-item';
import { MediaItem } from '@/app/models/api.model';
import { useState } from 'react';

enum Endpoints {
  getTitlesByQuery = "/api/compare-titles/get-titles-by-query",
}

interface TitlePickerProps {
  onTitleRemoved?: (item: MediaItem) => void;
}

export const TitlePicker = ({ onTitleRemoved }: TitlePickerProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedTitles, searchedTitles, setSelectedTitles, setSearchedTitles } =
    useTitleContext();

  const handleSearch = async (query: string) => {
    setSearchValue(query);
    if (query.length < 3) return setSearchedTitles([]);
    setLoading(true);
    const result = await fetch(`${Endpoints.getTitlesByQuery}?query=${query}`);
    const data = await result.json();
    setSearchedTitles(data);
    setLoading(false);
  };

  const handleTitleRemove = (item: MediaItem) => {
    if (onTitleRemoved) onTitleRemoved(item);
    setSelectedTitles(selectedTitles.filter((title) => title.id !== item.id));
  }

  const handleTitleSelect = (item: MediaItem) => {
    setSearchValue("");
    setSearchedTitles([]);
    setSelectedTitles([...selectedTitles, item]);
  }

  return (
    <div className={`title-picker_wrapper ${loading ? "load" : ""}`}>
      {selectedTitles.length ? <div className="title-picker_selected" >
        {selectedTitles.map((title) => (
          <TitleItem posterOnly onTitleRemove={handleTitleRemove} key={title.id} item={title} />
        ))}
      </div> : null}
      <DebouncedInput
        onChange={(query) => handleSearch(query)}
        delay={500}
        value={searchValue}
        placeholder="Search for a movie or TV show"
        className="title-picker_input"
        type="text"
      />
      {searchedTitles.length ? <div className="title-picker_result" >
        {searchedTitles.map((title) => (
          <TitleItem onTitleSelect={handleTitleSelect} key={title.id} item={title} />
        ))}
      </div> : null}
    </div>
  );
}