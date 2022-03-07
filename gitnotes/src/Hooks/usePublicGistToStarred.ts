
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addStarGistFromPublic,StarGist } from "../store/slices/userGists";

export function usePublicGistToStarred(gistId:number){
    const dispatch =useAppDispatch();
    // const publicGistData =useAppSelector((state )=>state.publicGist.gistsData)
    // const userStarredData = useAppSelector((state) => state.userGists.starredGists);
    // let starGistItem = publicGistData.find((gist) => gist.gistId === gistId);
    // dispatch(StarGist(gistId?.toString()));
    // if(starGistItem){
    //     dispatch(addStarGistFromPublic(starGistItem))
    // }
   





    return 
}