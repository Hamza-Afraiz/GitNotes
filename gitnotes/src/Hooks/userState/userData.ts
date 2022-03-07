import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addStarGistFromPublic,StarGist } from "../../store/slices/userGists";

export function useLoadingState(){
   
    const loadingState=useAppSelector((state) => state.userGists.loading);




    return loadingState;
}
export function useUserState(){
   
    const data=useAppSelector((state) => state.user.loggedIn);




    return data;
}
export function usePublicGists(){
   
    const data=useAppSelector((state) => state.publicGist.gistsData);




    return data;
}