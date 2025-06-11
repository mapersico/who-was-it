"use client";

import Image from "next/image";
import { ActorItem as ActorItemType } from "@/app/models/api.model";

import './actor-item.scss';
import { useState } from "react";

interface ActorItemProps {
  item: ActorItemType;
}

const ActorItem = ({ item }: ActorItemProps) => {
  const [notFound, setNotFound] = useState(false);

  return (
    <div className="actor">
      <div className="actor_poster_wrapper">
        <Image
          className="actor_poster"
          src={notFound ? "/movie-placeholder.webp" : item.profileUrl}
          height={150}
          width={100}
          onError={() => setNotFound(true)}
          alt="poster"
        />
      </div>
      <div style={{ padding: "0.5rem 0", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <h3>{item.name}</h3>
        <ul className="actor_roles">
          {item.roles.map((role, i) =>
            <li key={i}>
              {role.character} {role.episodeCount > 0 ? `(${role.episodeCount} Eps)` : ""} -
              <strong> {role.title}</strong>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ActorItem;