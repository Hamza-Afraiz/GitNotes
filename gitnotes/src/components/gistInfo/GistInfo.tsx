//lib
import Alert from "@mui/material/Alert";
import React from "react";

//src
import {
  AnimatedTextComponent,
  GistIntroduction,
  GistOption,
} from "../../components";
import { GistData } from "../../types/gistData";

//styles
import "./gistInfo.css";
import { GistInfoContainer } from "../../styledComponents";

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
      {alertValue && (
        <Alert severity="success">
          <AnimatedTextComponent text={alertValue} />
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
