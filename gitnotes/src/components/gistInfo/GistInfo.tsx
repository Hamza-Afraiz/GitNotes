import { styled } from "@mui/material/styles";
import React from "react";
import { GistIntroduction, GistOption } from "../../components";
import { GistData } from '../../types/gistData';
import "./gistInfo.css";
import { useStarStatus } from "../../Hooks";
import Alert from "@mui/material/Alert";
import { AnimatedTextComponent, LoadingSpinner } from "../../components";


const GistInfoContainer = styled("div")(() => ({
  width: "80%",

  display: "flex",
  flexDirection: "row",

  justifyContent: "flex-start",
  padding: "2%",
}));
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
  const handleAlertValue=(alertValueProp:string)=>{
    setAlertValue(alertValueProp)

  }

  
  console.log("alert value",alertValue)

  return (
    <div className="gist-info"> 
    {alertValue !== null ? (
                <Alert severity="success">
                  <AnimatedTextComponent text={alertValue} />
                </Alert>
              ):null}
      <GistInfoContainer>
      <GistIntroduction
        ownerName={ownerName}
        fileName={fileName}
        creationDate={creationDate}
        ownerAvatar={ownerAvatar}
        description={description}
      />
      <GistOption gistId={gistId} gistType={gistType} starValue={starValue} handleAlertValue={handleAlertValue} />
    </GistInfoContainer>
      </div>
    
  );
};

export default GistInfo;
