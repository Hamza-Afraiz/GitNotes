import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GistsListHeading } from "../../styledComponents";
import { GistDataList } from "../../types/gistDataList";

export default function ListOfGists({ gistsData }: GistDataList) {
  const navigate = useNavigate();

  const listData = gistsData.map((item, index) => {
    return {
      id: index,
      name: item.ownerName,
      date: item.creationDate,
      noteBookName: item.fileName,
      avatar_url: item.ownerAvatar,
      keyword: item.gistId,
      time: item.time,
    };
  });

  function onGistClick(rowData: any) {
    navigate(`/gistPage`, {
      state: { item: gistsData[rowData.id] },
    });
  }
  return (
    <Box
      sx={{
        height: 600,
        width: "80%",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "5%",
        marginBottom: "5%",
        "& .colored": {
          backgroundColor: "#DEF5EC",
        },
      }}
    >
      <DataGrid
        sx={{
          "&.Mui-checkBox": {
            color: "red",
          },
        }}
        rows={listData}
        columns={GistsListHeading}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(param) => onGistClick(param.row)}
      />
    </Box>
  );
}
