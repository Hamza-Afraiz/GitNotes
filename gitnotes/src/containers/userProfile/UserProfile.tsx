import Divider from "@mui/material/Divider";
import React from "react";
//src
import { GistPage, LoadingSpinner } from "../../components";
import { useUserGistsData } from "../../hooks";
import { useAppSelector } from "../../store/hooks";
//styles
import { CustomButton } from "../../styledComponents";
import { GistData } from "../../types/gistData";
import "./userProfile.css";

const UserProfile = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const { data: userGistDataArray, isLoading, isFetching } = useUserGistsData();

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
      <div className="gistContainer" data-testid="gist-container">
        <div className="gistPage">
          {isFetching && (
            <LoadingSpinner width="30%" height="10%" color="blue" />
          )}
          {userGistDataArray?.length === 0 && <h1>No user gists found.</h1>}
          {!isLoading &&
            userGistDataArray?.map((item: GistData, index: number) => (
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
