import ForkIcon from "@mui/icons-material/ForkRight";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import StarFilledIcon from "@mui/icons-material/Star";
import StarIcon from "@mui/icons-material/StarBorder";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { LoadingSpinner } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DeleteGist, StarGist, UnStarGist } from "../../store/slices/userGists";
import "./gistOptions.css";
import { useNavigate } from "react-router-dom";
import {
  useWorkingGistId,
  usePublicGists,
  useLoadingState,
  useUserState,
} from "../../Hooks";

interface GistOptionProps {
  gistId?: number | string;
  gistType?: string;
  starValue?: boolean;
}
const GistOption = ({ gistId, gistType, starValue }: GistOptionProps) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const [starType, setStarValue] = React.useState(starValue);
  const userState = useUserState();
  const loadingState = useLoadingState();
  const workingGistId = useWorkingGistId();

  const publicGistData = usePublicGists();

  React.useEffect(() => {
    if (starValue) setStarValue(true);
  }, []);

  const handleStarIcon = () => {
    if (!starType) {
      let starGistItem = publicGistData.find((gist) => gist.gistId === gistId);
      dispatch(StarGist(gistId?.toString(), gistType, starGistItem));
      setStarValue(true);
    } else {
      dispatch(UnStarGist(gistId?.toString()));
      setStarValue(false);
    }
  };
  const handleDelete = () => {
    dispatch(DeleteGist(gistId?.toString()));
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
                      handleDelete();
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
                  handleStarIcon();
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
