import React from "react";
import { useLocation } from "react-router-dom";
import { GistCode, GistInfo } from "../../components";
import "./gistPage.css";
import { GistData } from "../../types/gistData";
import { useStarStatus } from "../../Hooks";

interface GistPageProps {
  gistData: GistData | null;
  gistType: string | undefined;
}

const GistPage = (props: GistPageProps) => {
  const location: any = useLocation();

  var gistData;
  var starValue;

  if (location?.state?.item) {
    gistData = location.state.item;
  } else {
    gistData = props.gistData;
  }
  starValue = useStarStatus(gistData.gistId);
  return (
    <div>
      <div className="gistPageContainer">
        <GistInfo
          ownerName={gistData.ownerName}
          fileName={gistData.fileName}
          creationDate={gistData.creationDate}
          ownerAvatar={gistData.ownerAvatar}
          description={gistData.description}
          gistId={gistData.gistId}
          gistType={props.gistType}
          starValue={starValue}
        />
        <GistCode GistCodeContent={gistData.content} />
      </div>
    </div>
  );
};

export default GistPage;
