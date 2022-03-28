//lib
import Alert from "@mui/material/Alert";
import React from "react";
//src
import {
  GistIntroduction,
  GistOption
} from "../../components";
import { GistInfoContainer } from "../../styledComponents";
import { GistData } from "../../types/gistData";
//styles
import "./gistInfo.css";



const GistInfo = ({
  ownerName,
  fileName,
  creationDate,
  description,
  ownerAvatar,
  gistId,
  gistType,
  starValue,
}: GistData) => {
  const [alertValue, setAlertValue] = React.useState<string | null>(null);
  const handleAlertValue = (alertValueProp: string) => {
    setAlertValue(alertValueProp);
  };

  return (
    <div className="gist-info">
      {alertValue &&  (
        <Alert data-testid='gist-option-completion'severity="info">
          {alertValue}
        </Alert>
      )}
      <GistInfoContainer>
        <GistIntroduction
          ownerName={ownerName}
          fileName={fileName}
          creationDate={creationDate}
          ownerAvatar={ownerAvatar}
          description={description}
        />
        <GistOption
          gistId={gistId}
          gistType={gistType}
          starValue={starValue}
          handleAlertValue={handleAlertValue}
        />
      </GistInfoContainer>
    </div>
  );
};

export default GistInfo;
