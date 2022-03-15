//lib

import ListIcon from "@mui/icons-material/List";
import GridIcon from "@mui/icons-material/Window";
import React, { useState } from "react";
import { Audio as LoadingSpinner } from "react-loader-spinner";

//hooks
import { usePublicGists, useStarredGistsData ,useErrorState} from "../../Hooks";
import { useAppDispatch } from "../../store/hooks";

//css
import { GistsContainer } from "../../styledComponents";

//src
import { GistData } from "../../types/gistData";
import { getGistsData } from "../../store/slices/publicGists";
import { GistGrid, GistList } from "../index";
import {PopUpNotification} from '../../components'
//
interface GistsProps {
  starredGists: boolean;
  searchQuery: string;
}

const Gists = ({ starredGists, searchQuery }: GistsProps) => {
  const dispatch = useAppDispatch();

  const publicsGistData = usePublicGists();
  const starredGistData = useStarredGistsData();
  const error=useErrorState();
  const gistData = starredGists ? starredGistData : publicsGistData;

  const [sortingType, setSortingType] = useState("list");
  const [searchedData, setSearchedData] = useState<GistData[]>([]);

  React.useEffect(() => {
    dispatch(getGistsData()); //Api call to get Gists Data

    if (searchQuery) {
      setSearchedData(
        gistData.filter(function (itm) {
          return itm.gistId?.toString().includes(searchQuery);
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div>
      {error &&  <PopUpNotification popUpText="Looks like you are not connected to the internet"/>}
      {!gistData.length ?   (
        <GistsContainer data-testid='loading' style={{ justifyContent: "center" }}>
          <LoadingSpinner
            height="10%"
            width="80%"
            color="#5ACBA1"
            ariaLabel="loading"
          />
        </GistsContainer>
      ) : (
        <div  data-testid="gist-list">
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
              <GistList gistsData={searchQuery ? searchedData : gistData} />
            ) : (
              <GistGrid gistsData={searchQuery ? searchedData : gistData} />
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default Gists;
