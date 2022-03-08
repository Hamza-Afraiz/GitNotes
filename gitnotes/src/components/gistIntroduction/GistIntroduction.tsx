import React from "react";
import { PlainText, UserNameAndFileName } from "../../styledComponents";
import "./gistIntroduction.css";
import {GistData} from '../../types/gistData'


const GistIntroduction = ({
  ownerName,
  ownerAvatar,
  fileName,
  creationDate,
  description,
}: GistData) => {
  

  return (
    <div className="gistInfoContainer">
      <img
        style={{ width: "25%",height:"100%",maxHeight:'100px',maxWidth:"25%", borderRadius: "50%" }}
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
