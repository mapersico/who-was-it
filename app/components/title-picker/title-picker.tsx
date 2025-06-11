"use client"

import './title-picker.scss';
import { useTitleContext } from '@/app/hooks/useTitle/title.context';

import DebouncedInput from "../debounced-input/debounced-input";
import TitleItem from '../title-item/title-item';
import { Endpoints, MediaItem } from '@/app/models/api.model';
import { useState } from 'react';

interface TitlePickerProps {
  onTitleRemoved?: (item: MediaItem) => void;
}

export const TitlePicker = ({ onTitleRemoved }: TitlePickerProps) => {
  const [focused, setFocused] = useState(false);
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
    <div className={`title-picker_wrapper${loading ? " load" : ""} ${focused ? "focused" : ""}`}>
      {selectedTitles.length ? <div className="title-picker_selected" >
        {selectedTitles.map((title) => (
          <TitleItem posterOnly onTitleRemove={handleTitleRemove} key={title.id} item={title} />
        ))}
      </div> : null}
      <DebouncedInput
        type="text"
        className="title-picker_input"
        placeholder="Search for a movie or TV show"
        delay={500}
        value={searchValue}
        onChange={(query) => handleSearch(query)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {searchedTitles.length ? <div className="title-picker_result" >
        {searchedTitles.filter((title) => !selectedTitles.find((selectedTitle) => selectedTitle.id === title.id)).map((title) => (
          <TitleItem onTitleSelect={handleTitleSelect} key={title.id} item={title} />
        ))}
      </div> : null}
    </div>
  );
}