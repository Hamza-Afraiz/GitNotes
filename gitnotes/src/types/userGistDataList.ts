import { GistData } from "./gistData";
export interface UserGistDataList {
    userGistsData: GistData[];
    starredGists: GistData[];
    loading:boolean;
    workingGistId:number;
}