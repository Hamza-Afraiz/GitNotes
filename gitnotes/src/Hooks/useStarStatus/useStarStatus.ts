import { useStarredGists } from "../../Hooks/useGists/useGists";
import { GistData } from "../../types/gistData";

export function useStarStatus(currentGistId: number | undefined) {
  const {starredGistData:starredGists} = useStarredGists();

  const starVal = starredGists?.filter((gist:GistData) => gist?.gistId === currentGistId);

  if (starVal?.length > 0) {
    return true;
  } else {
    return false;
  }
}
