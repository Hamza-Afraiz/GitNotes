import { styled } from "@mui/material/styles";
import React from "react";
import { GistIntroduction, GistOption } from "../../components";
import "./gistInfo.css";

interface GistData {
  ownerName?: string;
  ownerAvatar?: string;
  fileName?: string;
  creationDate?: string;
  gistId?: string;
  content?: string;
  time?: string;
  description?: string;
  id?: string;
  gistType?: string | undefined;
  starValue?: boolean;
}
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
