"use client";

import { Endpoints } from "@/app/models/api.model";

import './share-button.scss';
import { toast } from "react-toastify";

interface ShareButtonProps {
  titles: string | string[] | undefined;
}

export default function ShareButton({ titles }: ShareButtonProps) {
  const host = location.host;
  const handleCopyUrl = async () => {
    try {
      const result = await fetch(`${Endpoints.shareUrl}?titles=${titles}`);
      const data: { id: string } = await result.json();

      await navigator.clipboard.writeText(`${host}/shared-url?id=${data.id}`);

      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div>
      <button onClick={handleCopyUrl} className="share-button_action">
        🔗 Share
      </button>
    </div>
  )
}