import { useAppSelector } from "../../store/hooks";

export function useStarStatus(gistId: number | undefined) {
  const starredGists = useAppSelector((state) => state.userGists.starredGists);

  const starVal = starredGists.filter((gist) => gist.gistId === gistId);

  if (starVal.length > 0) {
    return true;
  } else {
    return false;
  }
}
