import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addStarGistFromPublic,StarGist } from "../../store/slices/userGists";

export function useWorkingGistId(){
   
    const workingGistId = useAppSelector(
        (state) => state.userGists.workingGistId
      );




    return workingGistId;
}