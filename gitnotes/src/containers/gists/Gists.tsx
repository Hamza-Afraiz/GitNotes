//lib

import React, { useState } from "react";
import { Audio as LoadingSpinner } from "react-loader-spinner";
import { PopUpNotification } from "../../components";
//hooks
import {
  useErrorState,
  usePublicGists,
  useStarredGistsData,
} from "../../Hooks";
import { useAppDispatch } from "../../store/hooks";
import { GistsData } from "../../store/slices/userGists";
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
  starredGists: boolean;
  searchQuery: string;
}

const Gists = ({ starredGists, searchQuery }: GistsProps) => {
  const dispatch = useAppDispatch();

  const publicsGistData = usePublicGists();
  const starredGistData = useStarredGistsData();
  const error = useErrorState();
  const gistData = starredGists ? starredGistData : publicsGistData;

  const [sortingType, setSortingType] = useState("list");
  const [searchedData, setSearchedData] = useState<GistData[]>([]);

  React.useEffect(() => {
    //Api call to get Gists Data

    if (searchQuery) {
      setSearchedData(
        gistData.filter(function (itm) {
          return itm.gistId?.toString().includes(searchQuery);
        })
      );
    } else {
      dispatch(GistsData("public"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div data-testid="gist-container">
      {error && (
        <PopUpNotification popUpText="Failed to get gists. Check your network connection." />
      )}
      {!gistData.length ? (
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
