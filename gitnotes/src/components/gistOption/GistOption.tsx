import EditIcon from "@mui/icons-material/Edit";
import ForkIcon from "@mui/icons-material/ForkRight";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import StarFilledIcon from "@mui/icons-material/Star";
import StarIcon from "@mui/icons-material/StarBorder";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components";
import {
  useLoadingState,
  usePublicGists,
  useUserState,
  useWorkingGistId,
} from "../../Hooks";
import { useAppDispatch } from "../../store/hooks";
import { DeleteGist, StarGist, UnStarGist } from "../../store/slices/userGists";
import "./gistOptions.css";

interface GistOptionProps {
  gistId?: number | string;
  gistType?: string;
  starValue?: boolean;
  handleAlertValue(alertValueProp: string): void;
}
const GistOption = ({
  gistId,
  gistType,
  starValue,
  handleAlertValue,
}: GistOptionProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [starType, setStarValue] = React.useState(starValue);

  const userState = useUserState();
  const loadingState = useLoadingState();
  const workingGistId = useWorkingGistId();
  const publicGistData = usePublicGists();

  const starGist = () => {
    //handling when we are clicked to star gist
    if (!starType) {


      let starGistItem = publicGistData.find((gist) => gist.gistId === gistId);
      dispatch(StarGist(gistId?.toString(), gistType, starGistItem));
      setStarValue(true);

      handleAlertValue("Star Successfully");//setting state using hook to show message upon completion of gist option


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

    handleAlertValue("DeletedSuccessfully");
  };

  
  const handleEdit = () => {
    navigate(`/createGist`, { state: { gistId: gistId } });
  };

  return (
    <div>
      {loadingState && workingGistId === gistId ? (
        <LoadingSpinner width="40%" height="20%" color="green" />
      ) : (
        <div>
          {userState ? (
            <div className="gistOptions">
              {gistType === "user" ? (
                <div>
                  <LoadingButton
                    endIcon={<RateReviewOutlinedIcon />}
                    loading={false}
                    loadingPosition="end"
                    variant="text"
                    onClick={() => {
                      deleteGist();
                    }}
                  >
                    Delete
                  </LoadingButton>
                  <LoadingButton
                    endIcon={<EditIcon />}
                    loading={false}
                    loadingPosition="end"
                    variant="text"
                    onClick={() => {
                      handleEdit();
                    }}
                  >
                    Edit
                  </LoadingButton>
                </div>
              ) : null}

              <LoadingButton
                endIcon={<ForkIcon />}
                loading={false}
                loadingPosition="end"
                variant="text"
              >
                Fork
              </LoadingButton>

              <LoadingButton
                endIcon={starType !== true ? <StarIcon /> : <StarFilledIcon />}
                loading={false}
                loadingPosition="end"
                variant="text"
                onClick={() => {
                  starGist();
                }}
              >
                {starType === true ? "UnStar" : "Star"}
              </LoadingButton>
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
