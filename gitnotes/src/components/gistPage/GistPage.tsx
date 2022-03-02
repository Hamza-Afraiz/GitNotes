import React from "react";
import { useLocation } from "react-router-dom";
import { GistCode, GistInfo } from "../../components";
import "./gistPage.css";
interface GistData {
  ownerName?: string;
  ownerAvatar?: string;
  fileName?: string;
  creationDate?: string;
  gistId?: number;
  content?: string[];
  time?: string;
  description?: string;
  id?: string;
}
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
    starValue = location.state.starValue;
  } else {
    gistData = props.gistData;
  }

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
