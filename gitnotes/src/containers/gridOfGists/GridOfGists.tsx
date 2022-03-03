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
  starValue: boolean;
}

const GridOfGists = ({ gistsData, starValue }: gistsDataList) => {
  let navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [showingGridData, setShowingGridData] = React.useState<GistData[]>([]);

  useEffect(() => {
    setShowingGridDataMethod(page);
  }, []);

  const setShowingGridDataMethod = (value: number) => {
    let showingGridDataTemp = gistsData.slice(value * 9, value * 9 + 9);
    setShowingGridData(showingGridDataTemp);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setShowingGridDataMethod(value);
  };

  return (
    <GridGistContainer>
      <Grid container spacing={{ xs: 5 }}>
        {showingGridData.map((_, index, item) => (
          <Grid item xs={4} key={index}>
            <GridGist
              onClick={() => {
                navigate(`/gistPage`, {
                  state: { item: item[index], starValue: starValue },
                });
              }}
            >
              <GistCode GistCodeContent={item[index]?.content} />
              <GistIntroduction
                ownerName={item[index]?.ownerName}
                fileName={item[index]?.fileName}
                creationDate={item[index]?.creationDate}
                ownerAvatar={item[index]?.ownerAvatar}
                description={item[index]?.description}
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
