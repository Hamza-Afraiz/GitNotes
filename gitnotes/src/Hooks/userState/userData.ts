import { useAppSelector } from "../../store/hooks";

export function useLoadingState() {
  return useAppSelector((state) => state.userGists.loading);
}
export function useUserState() {
  return useAppSelector((state) => state.user.loggedIn);
}

export function useErrorState() {
  return useAppSelector((state) => state.userGists.error);
}
