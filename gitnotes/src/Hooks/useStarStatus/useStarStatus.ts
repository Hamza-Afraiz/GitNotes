import { useQueryClient } from "react-query";
import { GistData } from "../../types/gistData";
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
