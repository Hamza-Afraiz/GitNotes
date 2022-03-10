import * as React from "react";

//styles
import "./profileImageAndName.css";

interface ProfileImageAndNameProps {
  avatar_url: string;
  ownerName: string;
}

export default function ProfileImageAndName({
  avatar_url,
  ownerName,
}: ProfileImageAndNameProps) {
  return (
    <div className="container">
      <div>
        <img src={avatar_url} alt="profile" className="profilePic" />
      </div>
      {ownerName}
    </div>
  );
}
