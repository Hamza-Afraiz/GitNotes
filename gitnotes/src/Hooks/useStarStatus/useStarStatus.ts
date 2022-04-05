import { useQueryClient } from "react-query";
import { GistData } from "../../types/gistData";
import { useStarredGistsData } from "../useGistsData/useGistsData";

export function useStarStatus(currentGistId: number | undefined) {

  const queryClient = useQueryClient();
  const starredGists: GistData[] | undefined =
    queryClient.getQueryData("starredGists",{exact:true}) ;
 
  return starredGists &&
    starredGists?.find((gist: GistData) => gist?.id === currentGistId)
    ? true
    : false;
}
