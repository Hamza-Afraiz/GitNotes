import React from "react";
import { PlainText, UserNameAndFileName } from "../../styledComponents";
import "./gistIntroduction.css";

interface GistData {
  ownerName?: string;
  ownerAvatar?: string;
  fileName?: string;
  creationDate?: string;
  gistId?: number;
  content?: string[];
  time?: string;
  description?: string;
}

const GistIntroduction = ({
  ownerName,
  ownerAvatar,
  fileName,
  creationDate,
  description,
}: GistData) => {
  console.log("descriptioon is", description);

  return (
    <div className="gistInfoContainer">
      <img
        style={{ width: "20%", borderRadius: "50%" }}
        src={ownerAvatar}
        alt="profile"
      />
      <div className="gistDetails">
        <UserNameAndFileName>
          <div>{ownerName}/</div>
          <div>{fileName}</div>
        </UserNameAndFileName>
        <PlainText>{creationDate}</PlainText>
        <PlainText>{description}</PlainText>
      </div>
    </div>
  );
};

export default GistIntroduction;
