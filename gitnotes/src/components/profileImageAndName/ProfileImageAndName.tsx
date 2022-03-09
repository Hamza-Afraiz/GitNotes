import * as React from "react";
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
        <img
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          src={avatar_url}
          alt="profile"
        />
      </div>
      <div>{ownerName}</div>
    </div>
  );
}
