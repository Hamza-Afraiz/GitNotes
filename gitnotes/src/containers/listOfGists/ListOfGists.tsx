import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GistsListColumns } from "../../styledComponents";

import {GistData} from '../../types/gistData'
interface gistsDataList {
  gistsData: GistData[];
}

export default function ListOfGists({ gistsData}: gistsDataList) {
  let navigate = useNavigate();

  const rows1 = gistsData.map((item, index) => {
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

  function handleOnClick(rowData: any) {
 
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
        rows={rows1}
        columns={GistsListColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(param) => handleOnClick(param.row)}
      />
    </Box>
  );
}
