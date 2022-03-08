import ListIcon from "@mui/icons-material/List";
import GridIcon from "@mui/icons-material/Window";
import React, { useState } from "react";
import { Audio } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { GridOfGists, ListOfGists } from "..";
import { usePublicGists, useStarredGists } from "../../Hooks";
import { getGistsData } from "../../store/slices/publicGists";
import { GistsContainer } from "../../styledComponents";
import { GistData } from "../../types/gistData";
//
const Gists = (props: any) => {
  const dispatch = useDispatch();
  let gistDataArray = usePublicGists();
  let starredGistData = useStarredGists();
  const location: any = useLocation();

  const [sortingType, setSortingType] = useState("List");
  const [searchedData, setSearchedData] = useState<GistData[]>([]);

  //filtering on searchBar
  const filterData = (gistId: string) => {
    console.log("filtering", props.searchQuery);
    gistDataArray = gistDataArray.filter(function (itm) {
      return itm.gistId?.toString().includes(gistId);
    });
    setSearchedData(gistDataArray);
    console.log("public gist dtaa ", gistDataArray);
  };

  console.log("query value is", props.searchQuery);
  const getPublicGists = () => {
    dispatch(getGistsData());
  };
  //checking whether we are on default route or we  are navigated to render public or starred Gist

  if (location?.state?.route) {
    gistDataArray = starredGistData;
  }

  React.useEffect(() => {
    console.log("rendering with", props.searchQuery);
    if (props.searchQuery) {
      console.log("hass query");
      filterData(props.searchQuery);
    }
    else{
      setSearchedData([])
    }
    getPublicGists();
  }, [props.searchQuery]);

  return (
    <div>
      {!gistDataArray.length ? (
        <GistsContainer style={{ justifyContent: "center" }}>
          <Audio height="10%" width="80%" color="#5ACBA1" ariaLabel="loading" />
        </GistsContainer>
      ) : (
        <div>
         
          <GistsContainer>
            <GridIcon
              fontSize="large"
              sx={{
                color: `${sortingType === "Grid" ? "#5ACBA1" : "lightgrey"}`,
              }}
              onClick={() => {
                setSortingType("Grid");
              }}
            />
            |
            <ListIcon
              fontSize="large"
              sx={{
                color: `${sortingType === "List" ? "#5ACBA1" : "lightgrey"}`,
              }}
              onClick={() => {
                setSortingType("List");
              }}
            />
          </GistsContainer>
          <>
            {sortingType === "List" ? (
              <ListOfGists
                gistsData={
                  searchedData.length > 0 ? searchedData : gistDataArray
                }
              />
            ) : (
              <GridOfGists
                gistsData={
                  searchedData.length > 0 ? searchedData : gistDataArray
                }
              />
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default Gists;
