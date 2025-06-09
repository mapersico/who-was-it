"use client"

import Image from 'next/image';
import './title-item.scss';
import { MediaItem } from '@/app/models/api.model';
import { useState } from 'react';

interface TitleItemProps {
  item: MediaItem;
  posterOnly?: boolean;
  readOnly?: boolean;
  onTitleSelect?: (item: MediaItem) => void;
  onTitleRemove?: (item: MediaItem) => void;
}

const TitleItem = ({ item, posterOnly = false, readOnly = false, onTitleSelect, onTitleRemove }: TitleItemProps) => {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setHovered(e.type === "mouseenter");
  }

  return posterOnly ? (
    <div className="item display-only">
      <div
        className="item_poster_wrapper"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        {(hovered && !readOnly) && (
          <div className="item_poster_overlay" onClick={() => onTitleRemove?.(item)}>
            <p>Click to</p>
            <p>Remove</p>
          </div>
        )}
        <Image
          onLoad={({ currentTarget }) => {
            if (currentTarget.complete) {
              setLoaded(true);
            }
          }}
          className={`item_poster ${loaded ? "loaded" : ""}`}
          src={item.posterUrl}
          height={90}
          width={50}
          alt="poster"
        />
      </div>
    </div>
  ) : (
    <div className="item" onClick={() => onTitleSelect?.(item)}>
      <div className="item_poster_wrapper">
        <Image
          onLoad={({ currentTarget }) => {
            if (currentTarget.complete) setLoaded(true);
          }}
          className={`item_poster ${loaded ? "loaded" : ""}`}
          src={item.posterUrl}
          height={90}
          width={50}
          alt="poster"
        />
      </div>
      <div>
        <h3>{item.name} ({new Date(item.releaseDate).getFullYear()})</h3>
        <p className="item_overview">{item.overview}</p>
      </div>
    </div>
  );
}

export default TitleItem;