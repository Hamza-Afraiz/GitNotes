import ListIcon from "@mui/icons-material/List";
import GridIcon from "@mui/icons-material/Window";
import React, { useEffect, useState } from "react";
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
  let publicGistData = useAppSelector((state) => state.publicGist.gistsData);
  let starredGistData = useAppSelector((state) => state.userGists.starredGists);
  var starValue: boolean = false;

  const [sortingType, setSortingType] = useState("List");

  const location: any = useLocation();
  if (location?.state?.route) {
    starValue = true;
    publicGistData = starredGistData;
  }

  const getPublicGists = () => {
    dispatch(getGistsData());
  };

  useEffect(() => {
    console.log("public use effect called");
    getPublicGists();
  }, []);
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
