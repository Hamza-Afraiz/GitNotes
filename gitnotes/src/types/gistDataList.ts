import { GistData } from "./gistData";
export interface GistDataList {
    gistsData: GistData[];
    error?: string;
    loading?:boolean
  }