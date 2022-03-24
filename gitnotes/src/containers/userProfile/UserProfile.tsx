import React from "react";
import Divider from '@mui/material/Divider';
//src
import { GistPage } from "../../components";
import { useAppSelector } from "../../store/hooks";
//styles
import { CustomButton, PlainText } from "../../styledComponents";
import "./userProfile.css";



const UserProfile = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const userGistDataArray = useAppSelector(
    (state) => state.userGists.userGistsData
  );

  return (
    <div className="container">
      <div className="infoContainer">
        <img
          className="userProfileImage"
          src={userData.ownerAvatar}
          alt="profilePic"
        />
        <div className="userName">{userData.ownerName}</div>
        <div>
          <CustomButton
            colorvalue="black"
            backgroundcolor="white"
            variant="contained"
            width="100%"
          >
            View Github Profile
          </CustomButton>
        </div>
      </div>
      <div className="gistContainer" data-testid='gist-container'>
        <div className="gistPage">
          {userGistDataArray.length < 1 && (
            <PlainText>No User Gists Yet.</PlainText>
          )}
          {userGistDataArray.map((item, index) => (
            <div key={index}>
                 <GistPage key={index} gistData={item} gistType="user" />
            <Divider />
            </div>
         
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
