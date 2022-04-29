import { useAppSelector } from "../../store/hooks";

export function useUserState() {
  return useAppSelector((state) => state.user.loggedIn);
}
