import { MediaItem } from "@/app/models/api.model";
import TitleItem from "../title-item/title-item";

export default function TitlesItemWrapper({ titles }: { titles: MediaItem[] }) {
  return (
    <div className="cast-in-common-list_titles">
      {titles.length && titles.map((title) => (
        <TitleItem key={title.id} item={title} posterOnly readOnly />
      ))}
    </div>
  );
}