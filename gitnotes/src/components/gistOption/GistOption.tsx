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
  useDeleteGist,
  useStarGist,
  useUnStarGist,
  useUserState,
} from "../../Hooks";
import { PlainText } from "../../styledComponents";
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
  const [starType, setStarValue] = React.useState(starValue);
  const [loading, setLoading] = React.useState(false);

  const userState = useUserState();
  const navigate = useNavigate();
  const theme = useTheme();

  const onStarGist = () => {
    handleAlertValue("Star Successfully");
    setStarValue(true);
    setLoading(false);
  };
  const onError = () => {
    handleAlertValue("Operation UnSuccessful");
    setLoading(false);
  };

  const onMutate = () => {
    setLoading(true);
  };
  const onUnStarGist = () => {
    handleAlertValue("UnStar Successfully");
    setStarValue(false);
    setLoading(false);
  };
  const onDeleteGist = () => {
    handleAlertValue("Deleted Successfully");
    setLoading(false);
  };
  const { mutate: StarGist } = useStarGist(
    gistId?.toString(),
    gistType,
    onStarGist,
    onError,
    onMutate
  );
  const { mutate: UnStarGist } = useUnStarGist(
    gistId?.toString(),
    onUnStarGist,
    onError,
    onMutate
  );
  const { mutate: DeleteGist } = useDeleteGist(
    gistId?.toString(),

    onDeleteGist,
    onError,
    onMutate
  );

  const starGist = async () => {
    //handling when we are clicked to star gist
    if (!starType) {
      StarGist();
    }

    //handling when we are clicked to Unstar gist
    else {
      UnStarGist();
    }
  };

  const handleEdit = () => {
    navigate(`/createGist`, { state: { gistId: gistId } });
  };

  return (
    <div>
      {loading ? (
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
                    onClick={() => {
                      DeleteGist();
                    }}
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
