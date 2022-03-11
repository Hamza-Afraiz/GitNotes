import React from "react";


//src
import { GistData } from "../../types/gistData";

//styles
import "./gistIntroduction.css";
import { PlainText, UserNameAndFileName } from "../../styledComponents";

const GistIntroduction = ({
  ownerName,
  ownerAvatar,
  fileName,
  creationDate,
  description,
}: GistData) => {
  return (
    <div className="gistInfoContainer">
     <div  className="gistUserImageDiv">
     <img
        className="gistUserImage"
        src={ownerAvatar}
        alt="profile"
      />
       </div> 
      <div className="gistDetails">
        <UserNameAndFileName>
          <div>{ownerName}/</div>
          <div>{fileName?.substring(0, 10)}</div>
        </UserNameAndFileName>
        <PlainText>{creationDate}</PlainText>
        <PlainText>{description?.substring(0, 10)}</PlainText>
      </div>
    </div>
  );
};

export default GistIntroduction;
