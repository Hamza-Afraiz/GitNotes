import ForkIcon from "@mui/icons-material/ForkRight";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import StarFilledIcon from "@mui/icons-material/Star";
import StarIcon from "@mui/icons-material/StarBorder";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DeleteGist, StarGist, UnStarGist } from "../../store/slices/userGists";
import "./gistOptions.css";

interface GistOptionProps {
  gistId?: number;
  gistType?: string;
  starValue?: boolean;
}
const GistOption = ({ gistId, gistType, starValue }: GistOptionProps) => {
  const dispatch = useAppDispatch();
  const [starType, setStarValue] = React.useState(starValue);
  const userState = useAppSelector((state) => state.user.loggedIn);

  const handleStarIcon = () => {
    if (!starType) {
      dispatch(StarGist(gistId?.toString()));
      setStarValue(true);
    } else {
      dispatch(UnStarGist(gistId?.toString()));
      setStarValue(false);
    }
  };
  const handleDelete = () => {
    dispatch(DeleteGist(gistId?.toString()));
  };
  return (
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
  );
};

export default GistOption;
