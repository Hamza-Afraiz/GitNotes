import Button, { ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import { GistPage } from "../../components";
import { useAppSelector } from "../../store/hooks";
import "./userProfile.css";
import { LoadingSpinner } from "../../components";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "black",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: alpha("#fff", 0.45),
  },
  width: "80%",
  marginTop: "5%",
}));

const UserProfile = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const userGistDataArray = useAppSelector(
    (state) => state.userGists.userGistsData
  );
  console.log('user gist dat a',userGistDataArray)
 


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
          {!userGistDataArray && <LoadingSpinner width="40%" height="60%" color="green"/>}
          {userGistDataArray.map((item, index) => (
            <GistPage key={index} gistData={item} gistType="user" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
