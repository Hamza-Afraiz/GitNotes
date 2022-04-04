import { useStarredGistsData } from "../../Hooks";
import { GistData } from "../../types/gistData";
import { useQueryClient } from "react-query";
export function useStarStatus(currentGistId: number | undefined) {
  const queryClient = useQueryClient();

  const starredGists: GistData[] | undefined =
    queryClient.getQueryData("starredGists");

  return starredGists &&
    starredGists?.filter((gist: GistData) => gist?.gistId === currentGistId)
      ?.length > 0
    ? true
    : false;
}
