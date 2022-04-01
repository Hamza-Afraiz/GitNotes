//lib

import React, { useState } from "react";
import { Audio as LoadingSpinner } from "react-loader-spinner";
import { PopUpNotification } from "../../components";
import { usePublicGists, useStarredGists } from "../../Hooks/useGists/useGists";

//css as custom
import {
  CustomGridIcon,
  CustomListIcon,
  GistsContainer,
} from "../../styledComponents";
//src
import { GistData } from "../../types/gistData";
import { GistGrid, GistList } from "../index";
import "./gists.css";

interface GistsProps {
  starredGists: boolean;
  searchQuery: string;
}

const Gists = ({ starredGists, searchQuery }: GistsProps) => {
  const { publicsGistData, isPublicGistsLoading, publicGistsError } =
    usePublicGists();
  const { starredGistData, starredGistsError } = useStarredGists();
  const gistData = starredGists ? starredGistData : publicsGistData;

  const [sortingType, setSortingType] = useState("list");
  const [searchedData, setSearchedData] = useState<GistData[]>([]);

  React.useEffect(() => {
    if (searchQuery) {
      setSearchedData(
        gistData?.filter(function (itm: GistData) {
          return itm.gistId?.toString().includes(searchQuery);
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div data-testid="gist-container">
      {publicGistsError && (
        <PopUpNotification popUpText="Failed to get public gists. Check your network connection." />
      )}
      {starredGistsError && (
        <PopUpNotification popUpText="Failed to get starred gists. Check your network connection." />
      )}
      {isPublicGistsLoading ? (
        <div data-testid="loading" className="loading-spinner">
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
