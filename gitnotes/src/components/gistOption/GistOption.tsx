//lib
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ForkIcon from "@mui/icons-material/ForkRight";
import StarFilledIcon from "@mui/icons-material/Star";
import StarIcon from "@mui/icons-material/StarBorder";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
//src
import { LoadingSpinner } from "../../components";
//Hooks
import {
  useCurrentGistId,
  useErrorState,
  useLoadingState,
  useUserState,
} from "../../Hooks";
import { useStarredGists, useUserGists } from "../../Hooks/useGists/useGists";
import { useAppDispatch } from "../../store/hooks";
import {
  DeleteGist,
  setErrorState,
  StarGist,
  UnStarGist,
} from "../../store/slices/userGists";
import { PlainText } from "../../styledComponents";
import { GistData } from "../../types/gistData";
//styles
import "./gistOptions.css";

interface GistOptionProps {
  gistId?: number | string;
  gistType?: string;
  starValue?: boolean;

  handleAlertValue: (alertValueProp: string) => void;
}
const GistOption = ({
  gistId,
  gistType,
  starValue,
  handleAlertValue,
}: GistOptionProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [starType, setStarValue] = React.useState(starValue);
  const userState = useUserState();
  const loadingState = useLoadingState();
  const currentGistId = useCurrentGistId();

  const error = useErrorState();
  const { mutateStarredGists, starredGistData } = useStarredGists();
  const { mutateUserGists, userGistsData } = useUserGists();
  const starGist = async () => {
    //handling when we are clicked to star gist
    if (!starType) {
      await dispatch(StarGist(gistId?.toString(), gistType));

      if (!loadingState && !error) {
        handleAlertValue("Star Successfully");
        setStarValue(true);
        mutateStarredGists(
          [
            ...starredGistData,
            userGistsData.find((gist: GistData) => gist.gistId === gistId),
          ],
          { revalidate: false }
        );
      } else {
        handleAlertValue("Looks Like something wrong with Star operation.");
        dispatch(setErrorState(false));
        return;
      }
      //setting state using hook to show message upon completion of gist option
    }

    //handling when we are clicked to Unstar gist
    else {
      await dispatch(UnStarGist(gistId?.toString()));

      if (!loadingState && !error) {
        handleAlertValue("UnStar Successfully");
        mutateStarredGists();
        setStarValue(false);
        mutateStarredGists(
          starredGistData.filter((gist: GistData) => gist.gistId !== gistId),

          { revalidate: false }
        );
      } else {
        handleAlertValue("Looks Like something wrong with Unstar operation.");
        dispatch(setErrorState(false));
        return;
      }
    }
  };

  const deleteGist = async () => {
    await dispatch(DeleteGist(gistId?.toString()));

    if (!loadingState) {
      handleAlertValue("Deleted Successfully");
      mutateUserGists(
        userGistsData.filter((gist: GistData) => gist.gistId !== gistId),
        { revalidate: false }
      );
    } else {
      handleAlertValue("Unable to delete.");
    }
  };

  const handleEdit = () => {
    navigate(`/createGist`, { state: { gistId: gistId } });
  };

  return (
    <div>
      {loadingState && currentGistId === gistId ? (
        <div data-testid="loading-spinner">
          <LoadingSpinner
            width="40%"
            height="20%"
            color={theme.color.primary}
          />
        </div>
      ) : (
        <div>
          {userState ? (
            <div className="gistOptions">
              {gistType === "user" && (
                <div>
                  <div
                    className="gist-option-button"
                    data-testid="gist-option-button-delete"
                    onClick={deleteGist}
                  >
                    <PlainText> Delete</PlainText>
                    <DeleteIcon color="info" fontSize="inherit" />
                  </div>
                  <div className="gist-option-button" onClick={handleEdit}>
                    <PlainText> Edit</PlainText>
                    <EditIcon color="info" fontSize="inherit" />
                  </div>
                </div>
              )}

              <div
                className="gist-option-button"
                data-testid="gist-option-button-star"
                onClick={starGist}
              >
                <PlainText> {starType ? "UnStar" : "Star"}</PlainText>
                {!starType ? (
                  <StarIcon color="info" fontSize="inherit" />
                ) : (
                  <StarFilledIcon color="info" fontSize="inherit" />
                )}
              </div>
              <div className="gist-option-button">
                <PlainText> Fork</PlainText>
                <ForkIcon color="info" className="icon" fontSize="inherit" />
              </div>
            </div>
          ) : (
            <div>
              <PlainText> Logged in to access options</PlainText>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GistOption;
