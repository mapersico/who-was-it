import { Suspense } from "react";
import SearchTitle from "../components/search-title/search-title";

export default async function CompareTitlesPage() {
  return (
    <Suspense>
      <SearchTitle />
    </Suspense>
  )
}