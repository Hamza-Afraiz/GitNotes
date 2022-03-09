import { useAppSelector } from "../../store/hooks";

export function useWorkingGistId(){
   
    const workingGistId = useAppSelector(
        (state) => state.userGists.workingGistId
      );




    return workingGistId;
}