import { styled } from "@mui/material/styles";
import React from "react";
import { GistIntroduction, GistOption } from "../../components";
import { GistData } from '../../types/gistData';
import "./gistInfo.css";
import { useStarStatus } from "../../Hooks";


const GistInfoContainer = styled("div")(() => ({
  width: "100%",

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
  
  

  return (
    <GistInfoContainer>
      <GistIntroduction
        ownerName={ownerName}
        fileName={fileName}
        creationDate={creationDate}
        ownerAvatar={ownerAvatar}
        description={description}
      />
      <GistOption gistId={gistId} gistType={gistType} starValue={starValue} />
    </GistInfoContainer>
  );
};

export default GistInfo;
