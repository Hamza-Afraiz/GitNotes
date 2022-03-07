import { useAppSelector } from "../../store/hooks";

export function useStarStatus(gistId:number|undefined){
    console.log('gistId in hook is',gistId)
   
    const starredGists = useAppSelector((state) => state.userGists.starredGists);
  
  const starVal = starredGists.filter((gist) => gist.gistId === gistId);
  console.log("star hook data is",starVal)
  if(starVal.length > 0){
    console.log("returning true")
      return true
      

  }
  else{
      console.log("false returned")
      return false
  }




   
}