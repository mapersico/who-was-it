"use client";

import Image from "next/image";
import { useState } from "react";
import { ActorItem as ActorItemType } from "@/app/models/api.model";

import './actor-item.scss';

interface ActorItemProps {
  item: ActorItemType;
}

const ActorItem = ({ item }: ActorItemProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="actor">
      <div className="actor_poster_wrapper">
        <Image
          className={`actor_poster ${loaded ? "loaded" : ""}`}
          onLoad={({ currentTarget }) => {
            if (currentTarget.complete) setLoaded(true);
          }}
          src={item.profileUrl}
          height={100}
          width={100}
          alt="poster"
        />
      </div>
      <div style={{ padding: "0.5rem 0" }}>
        <h3>{item.name}</h3>
        <ul className="actor_roles">
          {item.roles.map((role) =>
            <li key={role.character}>
              {role.character} ({role.episodeCount} Eps) -
              <strong> {role.title}</strong>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ActorItem;