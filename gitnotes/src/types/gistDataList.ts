import { GistData } from "./gistData";
export interface GistDataList {
    gistsData: GistData[];
    
    loading?:boolean
  }