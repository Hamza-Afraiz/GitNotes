import React from "react";

//src
import { GistPage, LoadingSpinner } from "../../components";
import { useAppSelector } from "../../store/hooks";

//styles

import { CustomButton } from "../../styledComponents";
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
          className="profileImage"
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
      <div className="gistContainer">
        <div className="gistPage">
          {!userGistDataArray && (
            <LoadingSpinner width="40%" height="60%" color="green" />
          )}
          {userGistDataArray.map((item, index) => (
            <GistPage key={index} gistData={item} gistType="user" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
