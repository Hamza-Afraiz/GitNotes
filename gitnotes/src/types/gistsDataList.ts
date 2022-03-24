import { GistData } from "./gistData";
export interface GistsDataList {
  publicGistsData: GistData[];
  userGistsData: GistData[];
  starredGists: GistData[];
  loading: boolean;
  currentGistId: number;
  error: string;
}
