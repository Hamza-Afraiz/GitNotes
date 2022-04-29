//lib
import React from "react";
import { useLocation } from "react-router-dom";

//src
import { GistCode, GistInfo } from "../../components";
import { GistData } from "../../types/gistData";
import { useStarStatus } from "../../hooks";

//styles
import "./gistPage.css";

interface GistPageProps {
  gistData: GistData | null;
  gistType: string | undefined;
}

const GistPage = (props: GistPageProps) => {
  const location: any = useLocation();
  //Gist Page component can be used for different purpose.It can be called as a component.And can be navigated to this component
  //thats why we have to handle different scenarios
  const gistData = location?.state?.item ? location.state.item : props.gistData;
  const starValue = useStarStatus(gistData?.gistId);

  return (
    <div>
      <div className="gistPageContainer" data-testid="gist-page">
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
