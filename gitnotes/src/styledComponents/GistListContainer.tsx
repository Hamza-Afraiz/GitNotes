import { styled } from "@mui/material/styles";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

export const GistListContainer = styled(DataGrid)<DataGridProps>(() => ({
  height: 600,
  width: "90%",
  marginLeft: "5%",
  marginRight: "5%",
  marginTop: "0%",
  marginBottom: "5%",
  "& .colored": {
    backgroundColor: "#DEF5EC",
  },
}));
