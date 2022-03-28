import { useAppSelector } from "../../store/hooks";
import { useStarredGistsData } from "../../react-query/react-query";
import { GistData } from "../../types/gistData";
export function useStarStatus(currentGistId: number | undefined) {
 

  const starVal = useStarredGistsData().data?.filter((gist:GistData) => gist.gistId === currentGistId);

  if (starVal?.length > 0) {
    return true;
  } else {
    return false;
  }
}
