import { useAppSelector } from "../../store/hooks";

export function useLoadingState() {
  return useAppSelector((state) => state.userGists.loading);
}
export function useUserState() {
  return useAppSelector((state) => state.user.loggedIn);
}
export function usePublicGists() {
  return useAppSelector((state) => state.publicGist.gistsData);
}
export function useStarredGistsData() {
  return useAppSelector((state) => state.userGists.starredGists);
}

export function useUserGists() {
  return useAppSelector((state) => state.userGists.userGistsData);
}
export function useErrorState() {
  return useAppSelector((state) => state.publicGist.error);
}
