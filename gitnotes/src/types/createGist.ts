export interface File {
  fileContent: string;
  fileDescription: string;
  fileName: string;
}
export interface createGist {
  files: File[];
  description: string;
}
