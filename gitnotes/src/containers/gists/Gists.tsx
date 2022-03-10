//lib

import ListIcon from "@mui/icons-material/List";
import GridIcon from "@mui/icons-material/Window";
import React, { useState } from "react";
import { Audio as LoadingSpinner } from "react-loader-spinner";

//hooks
import { usePublicGists, useStarredGistsData } from "../../Hooks";
import { useAppDispatch } from "../../store/hooks";

//css
import { GistsContainer } from "../../styledComponents";


//src
import { GistData } from "../../types/gistData";
import { getGistsData } from "../../store/slices/publicGists";
import { GistGrid, GistList } from "../index";
//
const Gists = (props: any) => {
  const dispatch = useAppDispatch();

  const publicsGistData = usePublicGists();

  const starredGistData = useStarredGistsData();
  const gistData = props.starredGists ? starredGistData : publicsGistData;

  const [sortingType, setSortingType] = useState("list");
  const [searchedData, setSearchedData] = useState<GistData[]>([]);

  React.useEffect(() => {
    dispatch(getGistsData()); //Api call to get Gists Data

    if (props.searchQuery) {
      setSearchedData(
        gistData.filter(function (itm) {
          return itm.gistId?.toString().includes(props.searchQuery);
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchQuery]);

  return (
    <div>
      {!gistData.length ? (
        <GistsContainer style={{ justifyContent: "center" }}>
          <LoadingSpinner
            height="10%"
            width="80%"
            color="#5ACBA1"
            ariaLabel="loading"
          />
        </GistsContainer>
      ) : (
        <div>
          <GistsContainer>
            <GridIcon
              fontSize="large"
              sx={{
                color: `${sortingType === "grid" ? "#5ACBA1" : "lightgrey"}`,
              }}
              onClick={() => {
                setSortingType("grid");
              }}
            />
            |
            <ListIcon
              fontSize="large"
              sx={{
                color: `${sortingType === "list" ? "#5ACBA1" : "lightgrey"}`,
              }}
              onClick={() => {
                setSortingType("list");
              }}
            />
          </GistsContainer>
          <>
            {sortingType === "list" ? (
              <GistList
                gistsData={props.searchQuery ? searchedData : gistData}
              />
            ) : (
              <GistGrid
                gistsData={props.searchQuery ? searchedData : gistData}
              />
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default Gists;
