//lib
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";

//styles
import { GistListContainer, GistsListHeading } from "../../styledComponents";

//types
import { GistDataList } from "../../types/gistDataList";
import "./gistList.css";




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
    <Box className="Box">
      <GistListContainer
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
