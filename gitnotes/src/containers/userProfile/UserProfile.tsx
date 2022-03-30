import React from "react";
import Divider from '@mui/material/Divider';
//src
import { GistPage } from "../../components";
import { useAppSelector } from "../../store/hooks";
import { useUserGists } from "../../Hooks/useGists/useGists";
//styles
import { CustomButton, PlainText } from "../../styledComponents";
import "./userProfile.css";
import { GistData } from "../../types/gistData";



const UserProfile = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const {userGistsData:userGistDataArray}=useUserGists()

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
          {userGistDataArray?.length < 1 && (
            <PlainText>No User Gists Yet.</PlainText>
          )}
          {userGistDataArray?.map((item:GistData, index:number) => (
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
