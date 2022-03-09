import Alert from "@mui/material/Alert";
import React from "react";
import {
  AnimatedTextComponent,
  GistIntroduction,
  GistOption
} from "../../components";
import { GistInfoContainer } from "../../styledComponents";
import { GistData } from "../../types/gistData";
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
      {alertValue !== null ? (
        <Alert severity="success">
          <AnimatedTextComponent text={alertValue} />
        </Alert>
      ) : null}
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
