import Button, { ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React from "react";
import { AnimatedTextComponent, LoadingSpinner } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  CreateGist as CreateGistByUser,
  UpdateGist,
} from "../../store/slices/userGists";
import { File } from "../../types/createGist";
import { useLocation } from "react-router-dom";
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
  const [editing, setEditing] = React.useState(false);
  const [gistDescription, setGistDescription] = React.useState("");
  const [gistName, setGistName] = React.useState("");
  const [gistContent, setGistContent] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [editingGistId, setEditingGistId] = React.useState(0);

  const dispatch = useAppDispatch();
  const location: any = useLocation();
  const userState = useAppSelector((state) => state.user.loggedIn);
  const loadingState = useAppSelector((state) => state.userGists.loading);
  const userGistData = useAppSelector((state) => state.userGists.userGistsData);

  React.useEffect(() => {
    checkingRoute();
  }, []);
  const checkingRoute = () => {
    if (location?.state?.gistId) {
      getGistDataFromRedux(location.state.gistId);
      setEditing(true);
    }
  };

  const getGistDataFromRedux = (gistId: number) => {
    let editGistItem = userGistData.find((gist) => gist.gistId === gistId);

    console.log("editng item is", editGistItem);
    SettingEditData(editGistItem);
  };
  const SettingEditData = (gistData: any) => {
    setGistDescription(gistData.description);
    setGistName(gistData.fileName);
    setGistContent(gistData.content.toString());
    setEditingGistId(gistData.gistId);
  };

  const postRequestOfGist = () => {
    const createGist = {
      files: files,
      description: gistDescription,
    };
    if (files.length > 0) {
      if (editing) {
        dispatch(UpdateGist(createGist, editingGistId.toString()));
      } else {
        dispatch(CreateGistByUser(createGist));
      }
    } else {
      alert(
        "Add some Files First Please Or make some change in Existing to Update"
      );
      return;
    }

    if (!loadingState) {
      console.log("resetFileting");
      resetFile();
      resetGist();
      setPosted(true);
    }
  };
  const resetGist = () => {
    setFiles([]);
    setGistDescription("");
    setEditing(false);
  };
  const resetFile = () => {
    setGistContent("");

    setGistName("");
  };
  const AddFile = () => {
    if (!gistContent || !gistName) {
      alert("Please Enter gist Details first");
      return;
    }
    const createGist = {
      fileContent: gistContent,
      fileDescription: gistDescription,
      fileName: gistName,
    };
    setFiles((files) => [...files, createGist]);
    console.log("files are ", files);
    resetFile();
    //postRequestOfGist();
  };
  return (
    <div className="createGistContainer">
      {posted && <AnimatedTextComponent text=" Gist Posted !!!" />}
      {!posted &&
        (files.length > 0 ? (
          <AnimatedTextComponent text="File Added. Add More or just push the gist  !!!" />
        ) : null)}
      <TextField
        id="outlined-multiline-static"
        label="File Name"
        multiline
        value={gistName}
        onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
          setGistName(value.target.value);
        }}
      />
      <TextField
        id="outlined-multiline-static"
        label=" Gist Description"
        multiline
        sx={{ marginTop: "2%" }}
        value={gistDescription}
        onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
          setGistDescription(value.target.value);
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
          AddFile();
        }}
        variant="contained"
      >
        {userState === true ? "Add File " : "Please Login First"}
      </ColorButton>
      <ColorButton
        onClick={() => {
          postRequestOfGist();
        }}
        variant="contained"
      >
        {userState === true ? (
          loadingState === true ? (
            <LoadingSpinner width="20%" height="20%" color="white" />
          ) : editing ? (
            " Update Gist"
          ) : (
            "Add Gist"
          )
        ) : (
          "Please Login First"
        )}
      </ColorButton>
    </div>
  );
};

export default CreateGist;
