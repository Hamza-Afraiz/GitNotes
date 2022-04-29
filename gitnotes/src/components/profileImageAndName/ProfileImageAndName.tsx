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
    <div className="container" data-testid="name">
      <div>
        <img src={avatar_url} alt="profile" className="profilePic" />
      </div>
      <div className="owner-name">{ownerName.substring(0, 15)}</div>
    </div>
  );
}
