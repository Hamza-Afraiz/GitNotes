import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//src
import { GistCode, GistIntroduction } from "../../components";
import { GistDataList } from "../../types/gistDataList";
import { GistData } from "../../types/gistData";

//styles
import { GridGist, GridGistContainer } from "../../styledComponents";

const GistGrid = ({ gistsData }: GistDataList) => {
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = React.useState(0);
  const [gridData, setGridData] = React.useState<GistData[]>([]);

  const changeGridData = (value: number) => {
    setGridData(gistsData.slice(value * 9, value * 9 + 9));
  };

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    changeGridData(value);
  };

  useEffect(() => {
    changeGridData(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridGistContainer>
      <Grid container spacing={{ xs: 5 }}>
        {gridData.map((item, index) => (
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
      <Stack sx={{ marginTop: "4%" }} spacing={2}>
        <Pagination
          count={Math.round(gistsData.length / 9)}
          page={pageNumber}
          onChange={changePage}
        />
      </Stack>
    </GridGistContainer>
  );
};

export default GistGrid;
