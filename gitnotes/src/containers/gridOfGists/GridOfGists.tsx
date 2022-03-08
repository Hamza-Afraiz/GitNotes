import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GistCode, GistIntroduction } from "../../components";
import { GridGist, GridGistContainer } from "../../styledComponents";
import {GistData} from '../../types/gistData'


interface gistsDataList {
  gistsData: GistData[];
}

const GridOfGists = ({ gistsData}: gistsDataList) => {
  let navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [showingGridData, setShowingGridData] = React.useState<GistData[]>([]);

  const handlePaginaion = (value: number) => {
    let showingGridDataTemp = gistsData.slice(value * 9, value * 9 + 9);
    setShowingGridData(showingGridDataTemp);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    handlePaginaion(value);
  };

  useEffect(() => {
    handlePaginaion(page);
  }, []);

  return (
    <GridGistContainer>
      <Grid container spacing={{ xs: 5 }}>
        {showingGridData.map((item , index) => (
          <Grid item xs={4} key={index}>
            <GridGist
              onClick={() => {
                navigate(`/gistPage`, {
                  state: { item: item },
                });
              }}
            >
              <GistCode GistCodeContent={item?.content} />
              <GistIntroduction
                ownerName={item?.ownerName}
                fileName={item?.fileName}
                creationDate={item?.creationDate}
                ownerAvatar={item?.ownerAvatar}
                description={item?.description}
              />
            </GridGist>
          </Grid>
        ))}
      </Grid>
      <Stack sx={{ marginTop: "2%" }} spacing={2}>
        <Pagination
          count={Math.round(gistsData.length / 9)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </GridGistContainer>
  );
};

export default GridOfGists;
