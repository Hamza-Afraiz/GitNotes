import ListIcon from "@mui/icons-material/List";
import GridIcon from "@mui/icons-material/Window";
import React, { useState } from "react";
import { Audio } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { GridOfGists, ListOfGists } from "../../containers";
import { useAppSelector } from "../../store/hooks";
import { getGistsData } from "../../store/slices/publicGists";
import { GistsContainer } from "../../styledComponents";
//
const PublicGist = () => {
  const dispatch = useDispatch();
  const [navigationState, setNavigationState] = React.useState(true);
  let publicGistData = useAppSelector((state) => state.publicGist.gistsData);
  let starredGistData = useAppSelector((state) => state.userGists.starredGists);
  var starValue: boolean = false;

  const [sortingType, setSortingType] = useState("List");
  const handleFiltering = (gistId: string) => {
    let previousArray = publicGistData;
    var filteredArray = previousArray.filter(function (itm) {
      return itm.gistId?.toString() === gistId;
    });

    publicGistData = filteredArray;
  };
  const location: any = useLocation();
  const getPublicGists = () => {
    dispatch(getGistsData());
  };

  switch (location?.state?.route) {
    case "starred":
      starValue = true;
      publicGistData = starredGistData;
      // code block
      break;
    case "search":
      handleFiltering(location?.state?.gistId);
      break;

    default:
      if (navigationState) {
        getPublicGists();
        setNavigationState(false);
      }
  }

  return (
    <div>
      {publicGistData.length > 0 ? (
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
              <ListOfGists gistsData={publicGistData} starValue={starValue} />
            ) : (
              <GridOfGists gistsData={publicGistData} starValue={starValue} />
            )}
          </>
        </div>
      ) : (
        <GistsContainer style={{ justifyContent: "center" }}>
          <Audio height="10%" width="80%" color="#5ACBA1" ariaLabel="loading" />
        </GistsContainer>
      )}
    </div>
  );
};

export default PublicGist;
