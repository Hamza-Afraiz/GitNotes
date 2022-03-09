import ListIcon from "@mui/icons-material/List";
import GridIcon from "@mui/icons-material/Window";
import React, { useState } from "react";
import { Audio } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { GistGrid, GistList } from "../index";
import { usePublicGists, useStarredGistsData } from "../../Hooks";
import { getGistsData } from "../../store/slices/publicGists";
import { GistsContainer } from "../../styledComponents";
import { GistData } from "../../types/gistData";
import { PopUpNotification } from "../../components";
//
const Gists = (props: any) => {
  const dispatch = useDispatch();
  let gistDataArray = usePublicGists();
  const starredGistData = useStarredGistsData();

  const [sortingType, setSortingType] = useState("list");
  const [searchedData, setSearchedData] = useState<GistData[]>([]);

  //filtering on searchBar
  const filterData = (gistId: string) => {
    gistDataArray = gistDataArray.filter(function (itm) {
      return itm.gistId?.toString().includes(gistId);
    });
    
    setSearchedData(gistDataArray);
  };

  const getPublicGists = () => {
    dispatch(getGistsData());
  };
  //checking whether we are on default route or we  are navigated to render public or starred Gist
  if (props.starredGists) {
    gistDataArray = starredGistData;
  }

  React.useEffect(() => {
  
    getPublicGists();
    if (props.searchQuery) {
      filterData(props.searchQuery);
    } else {
      setSearchedData([]);
    }
   
  }, [props.searchQuery]);

  return (
    <div>
      {props.searchQuery && (
        <PopUpNotification popUpText={`Found ${searchedData.length} Results`} />
      )}
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
                gistsData={
                  searchedData.length > 0 ? searchedData : props.searchQuery ? searchedData: gistDataArray
                }
              />
            ) : (
              <GistGrid
              gistsData={
                searchedData.length > 0 ? searchedData : props.searchQuery ? searchedData: gistDataArray
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
