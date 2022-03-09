import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import React from "react";
import { useLocation } from "react-router-dom";
import {
  AnimatedTextComponent,
  LoadingSpinner,
  PopUpNotification,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  CreateGist as CreateGistByUser,
  UpdateGist,
} from "../../store/slices/userGists";
import { CustomButton } from "../../styledComponents";
import { File } from "../../types/createGist";
import "./createGist.css";

const CreateGist = () => {
  const dispatch = useAppDispatch();
  const location: any = useLocation();

  const [postedGist, setPostedGist] = React.useState(false);
  const [editingGist, setEditingGist] = React.useState(false);
  const [gistDescription, setGistDescription] = React.useState("");
  const [gistName, setGistName] = React.useState("");
  const [gistContent, setGistContent] = React.useState("");
  const [gistFiles, setFiles] = React.useState<File[]>([]);
  const [editingGistId, setEditingGistId] = React.useState(0);
  const [popUpText, setPopUpText] = React.useState("");



  const userState = useAppSelector((state) => state.user.loggedIn);
  const { loading, userGistsData } = useAppSelector((state) => state.userGists);


  const EditingGist = () => {
    if (location?.state?.gistId) {
      editingGistData(location.state.gistId);
      setEditingGist(true);
    }
  };
 

  

  const editingGistData = (gistId: number) => {
    let editGistItem = userGistsData.find((gist) => gist.gistId === gistId);

    SettingEditData(editGistItem);
  };


  const SettingEditData = (gistData: any) => {
    setGistDescription(gistData.description);
    setGistName(gistData.fileName);
    setGistContent(gistData.content.toString());
    setEditingGistId(gistData.gistId);
  };


  const AddGist = () => {
    const createGist = {
      files: gistFiles,
      description: gistDescription,
    };
    if (gistFiles.length) {
      if (editingGist) {
        dispatch(UpdateGist(createGist, editingGistId.toString()));
      } else {
        dispatch(CreateGistByUser(createGist));
      }
    } else {
      setPopUpText(
        "Add some Files First Please Or make some change in Existing to Update."
      );

      return;
    }

    if (!loading) {
      resetFile();
      resetGist();
      setPostedGist(true);
    }
  };


  const resetGist = () => {
    setFiles([]);
    setGistDescription("");
    setEditingGist(false);
  };


  const resetFile = () => {
    setGistContent("");

    setGistName("");
  };

  const AddFile = () => {
    if (!gistContent || !gistName) {
      setPopUpText("Please Enter Gist Details First");
      return;
    }
    const createGist = {
      fileContent: gistContent,
      fileDescription: gistDescription,
      fileName: gistName,
    };
    setFiles((gistFiles) => [...gistFiles, createGist]);

    resetFile();
    
  };



  React.useEffect(() => {
    EditingGist();
  }, []);



  return (
    <div className="createGistContainer">
      {popUpText && <PopUpNotification popUpText={popUpText} />}
      {postedGist && (
        <Alert severity="success">
          <AnimatedTextComponent text=" Gist Posted !!!" />
        </Alert>
      )}
      {!postedGist &&
        (gistFiles.length > 0 ? (
          <Alert severity="info">
            {" "}
            <AnimatedTextComponent text="File Added. Add more or just push the gist  !!!" />
          </Alert>
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
      <CustomButton
        onClick={() => {
          AddFile();
        }}
        variant="contained"
        colorvalue="white"
        backgroundcolor="#5ACBA1"
        width="20%"
      >
        {userState === true ? "Add File " : "Please Login First"}
      </CustomButton>
      <CustomButton
        onClick={() => {
          AddGist();
        }}
        variant="contained"
        colorvalue="white"
        backgroundcolor="#5ACBA1"
        width="20%"
      >
        {userState === true ? (
          loading === true ? (
            <LoadingSpinner width="20%" height="20%" color="white" />
          ) : editingGist ? (
            " Update Gist"
          ) : (
            "Add Gist"
          )
        ) : (
          "Please Login First"
        )}
      </CustomButton>
    </div>
  );
};

export default CreateGist;
