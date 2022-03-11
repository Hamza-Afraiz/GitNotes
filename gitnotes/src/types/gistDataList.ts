import { GistData } from "./gistData";
export interface GistDataList {
    gistsData: GistData[];
    error?: boolean;
    loading?:boolean
  }