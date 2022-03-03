import Button, { ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CreateGist as CreateGistByUser } from "../../store/slices/userGists";
import "./createGist.css";

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  backgroundColor: "#5ACBA1",
  "&:hover": {
    backgroundColor: alpha("#5ACBA1", 0.65),
  },
  width: "20%",
  marginTop: "5%",
}));
const CreateGist = () => {
  const [posted, setPosted] = React.useState(false);
  const [gistDescription, setGistDescription] = React.useState("");
  const [gistName, setGistName] = React.useState("");
  const [gistContent, setGistContent] = React.useState("");
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.loggedIn);

  const postRequestOfGist = () => {
    const createGist = {
      fileName: gistName,
      fileContent: gistContent,
      fileDescription: gistDescription,
    };
    if (!posted) {
      dispatch(CreateGistByUser(createGist));
    }

    setPosted(true);
  };

  return (
    <div className="createGistContainer">
      <TextField
        id="outlined-multiline-static"
        label=" Gist Description"
        multiline
        value={gistDescription}
        onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
          setGistDescription(value.target.value);
        }}
      />
      <TextField
        id="outlined-multiline-static"
        label="File Name"
        multiline
        sx={{ marginTop: "2%" }}
        value={gistName}
        onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
          setGistName(value.target.value);
        }}
      />
      <TextField
        id="outlined-multiline-static"
        label="File Content"
        multiline
        rows={4}
        value={gistContent}
        sx={{ marginTop: "4%" }}
        onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
          setGistContent(value.target.value);
        }}
      />

      <ColorButton
        onClick={() => {
          postRequestOfGist();
        }}
        variant="contained"
      >
        {userState === true
          ? posted !== true
            ? "Add Gist"
            : "Posted"
          : "Please Login First"}
      </ColorButton>
    </div>
  );
};

export default CreateGist;
