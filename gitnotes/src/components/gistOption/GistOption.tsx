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
  useLoadingState,
  usePublicGists,
  useUserState
} from "../../Hooks";
import { useAppDispatch } from "../../store/hooks";
import { DeleteGist, StarGist, UnStarGist } from "../../store/slices/userGists";
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
  const workingGistId = useCurrentGistId();
  const publicGistData = usePublicGists();

  const starGist = () => {
    //handling when we are clicked to star gist
    if (!starType) {
      const starGistItem = publicGistData.find(
        (gist) => gist.gistId === gistId
      );
      dispatch(StarGist(gistId?.toString(), gistType, starGistItem));
      setStarValue(true);

      handleAlertValue("Star Successfully"); //setting state using hook to show message upon completion of gist option
    }

    //handling when we are clicked to Unstar gist
    else {
      dispatch(UnStarGist(gistId?.toString()));
      setStarValue(false);

      handleAlertValue("Unstar Successfully");
    }
  };

  const deleteGist = () => {
    dispatch(DeleteGist(gistId?.toString()));

    handleAlertValue("Deleted Successfully");
  };

  const handleEdit = () => {
    navigate(`/createGist`, { state: { gistId: gistId } });
  };

  return (
    <div>
      {loadingState && workingGistId === gistId ? (
        <LoadingSpinner width="40%" height="20%" color={theme.color.primary} />
      ) : (
        <div>
          {userState ? (
            <div className="gistOptions">
              {gistType === "user" && (
                <div>
                  <div className="gist-option-button" onClick={deleteGist}>
                    Delete
                    <DeleteIcon color='info'/>
                  </div>
                  <div className="gist-option-button" onClick={handleEdit}>
                    Edit
                    <EditIcon color='info' />
                  </div>
                </div>
              )}

              <div className="gist-option-button" onClick={starGist}>
                {starType ? "UnStar" : "Star"}
                {!starType ? <StarIcon color='info' /> : <StarFilledIcon color='info' />}
              </div>
              <div className="gist-option-button">
                Fork
                <ForkIcon  color='info'/>
              </div>
            </div>
          ) : (
            <div>Logged in to access options</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GistOption;
