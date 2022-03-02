import { styled } from "@mui/material/styles";
import * as React from "react";

const Row = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  width: "80%",
}));
const ProfileImage = styled("div")(() => ({}));

interface ProfileImageAndNameProps {
  avatar_url: string;
  ownerName: string;
}

export default function ProfileImageAndName({
  avatar_url,
  ownerName,
}: ProfileImageAndNameProps) {
  return (
    <Row>
      <ProfileImage>
        <img
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          src={avatar_url}
          alt="profile"
        />
      </ProfileImage>
      <div>{ownerName}</div>
    </Row>
  );
}
