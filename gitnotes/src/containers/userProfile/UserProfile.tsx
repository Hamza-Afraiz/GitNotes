import Button, { ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import { GistPage } from "../../components";
import { useAppSelector } from "../../store/hooks";
import "./userProfile.css";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "black",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: alpha("#fff", 0.45),
  },
  width: "100%",
  marginTop: "5%",
}));

const UserProfile = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const userGistDataArray = useAppSelector(
    (state) => state.userGists.userGistsData
  );
 


  return (
    <div className="container">
      <div className="infoContainer">
        <img
          className="profileImage"
          src={userData.ownerAvatar}
          alt="profilePic"
        />
        <div className="userName">{userData.ownerName}</div>
        <div>
          <ColorButton onClick={() => {}} variant="contained">
            View Github Profile
          </ColorButton>
        </div>
      </div>
      <div className="gistContainer">
        <div className="gistPage">
          {userGistDataArray.map((item, index) => (
            <GistPage key={index} gistData={item} gistType="user" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
