//lib

import React, { useState } from "react";
import { Audio as LoadingSpinner } from "react-loader-spinner";
import { PopUpNotification } from "../../components";
//hooks

import { usePublicGistsData, useStarredGistsData } from "../../Hooks";
//css
import {
  CustomGridIcon,
  CustomListIcon,
  GistsContainer,
} from "../../styledComponents";
//src
import { GistData } from "../../types/gistData";
import { GistGrid, GistList } from "../index";
import "./gists.css";

//
interface GistsProps {
 isStarredGists: boolean;
  searchQuery: string;
}

const Gists = ({isStarredGists, searchQuery }: GistsProps) => {

  const { data: publicsGistData, error: publicGistError } =
    usePublicGistsData();
  const { data: starredGistData, error: starredGistError } =
    useStarredGistsData( );
 
  
  const gistData =isStarredGists ? starredGistData : publicsGistData;

  const [sortingType, setSortingType] = useState("list");
  const [searchedData, setSearchedData] = useState<GistData[]>([]);

  React.useEffect(() => {
    if (searchQuery) {
      setSearchedData(
        gistData?.filter(function (itm: any) {
          return itm.gistId?.toString().includes(searchQuery);
        })
      );
    }
 
  }, [searchQuery,isStarredGists,gistData]);

  return (
    <div data-testid="gist-container">
      {publicGistError && (
        <PopUpNotification popUpText="Failed to get public gists. Check your network connection." />
      )}
      {starredGistError && (
        <PopUpNotification popUpText="Failed to get starred gists. Check your network connection." />
      )}
      {!gistData?.length ? (
        <div className="loading-spinner" data-testid="loading">
          <LoadingSpinner
            height="10%"
            width="80%"
            color="#5ACBA1"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <div data-testid="gist-list">
          <GistsContainer>
            <CustomGridIcon
              sortingtype={sortingType}
              onClick={() => {
                setSortingType("grid");
              }}
            />
            |
            <CustomListIcon
              sortingtype={sortingType}
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
