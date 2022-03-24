import { useAppSelector } from "../../store/hooks";

export function useCurrentGistId() {
   

  return useAppSelector(
    (state) => state.userGists.currentGistId
  );;
}
