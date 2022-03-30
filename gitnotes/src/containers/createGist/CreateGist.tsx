//lib
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import React from "react";
import { useLocation } from "react-router-dom";
//src
import { LoadingSpinner, PopUpNotification } from "../../components";
import { useUserGists } from "../../Hooks/useGists/useGists";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  CreateGist as CreateGistByUser,
  setErrorState,
  UpdateGist,
} from "../../store/slices/userGists";
//styles
import { CustomButton } from "../../styledComponents";
import { File } from "../../types/createGist";
import { GistData } from "../../types/gistData";
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
 
  const { userGistsLoading:loading, userGistsData, userGistsError:error }=useUserGists()

  const EditingGist = () => {
    if (location?.state?.gistId) {
      editingGistData(location.state.gistId);
      setEditingGist(true);
    }
  };

  const editingGistData = (gistId: number) => {
    SettingEditData(userGistsData.find((gist:GistData) => gist.gistId === gistId));
  };

  const SettingEditData = (gistData: any) => {
    setGistDescription(gistData.description);
    setGistName(gistData.fileName);
    setGistContent(gistData.content.toString());
    setEditingGistId(gistData.gistId);
  };

  const AddGist = async () => {
    const createGist = {
      files: gistFiles,
      description: gistDescription,
    };

    if (gistFiles.length) {
      if (editingGist) {
        await dispatch(UpdateGist(createGist, editingGistId.toString()));
        dispatch(setErrorState(false));
      } else {
        // await dispatch(CreateGistByUser(createGist));
        // dispatch(setErrorState(false));
      }
    } else {
      setPopUpText("Add one file atleast to add gist .");

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
      setPopUpText("Please enter file content first");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="createGistContainer">
      {popUpText && <PopUpNotification popUpText={popUpText} />}

      {postedGist && !error ? (
        <div data-testid="gist-added">
          <Alert severity="success">Gist Added Successfully !!!</Alert>
        </div>
      ) : null}

          {error && <Alert severity="info">Unable to add gist.Check your network connection. !!!</Alert> }

      {!postedGist && Boolean(gistFiles.length) && (
        <div data-testid="file-added">
          <Alert severity="info">File Added !!!</Alert>
        </div>
      )}
      <TextField
        id="outlined-multiline-static"
        label="File Name"
        inputProps={{ "data-testid": "file-name" }}
        multiline
        value={gistName}
        onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
          setGistName(value.target.value);
        }}
      />
      <TextField
        id="outlined-multiline-static"
        label="Gist Description"
        inputProps={{ "data-testid": "gist-description" }}
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
        inputProps={{ "data-testid": "file-content" }}
        rows={4}
        value={gistContent}
        sx={{ marginTop: "4%" }}
        onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
          setGistContent(value.target.value);
        }}
      />
      <CustomButton
        onClick={AddFile}
        variant="contained"
        colorvalue="white"
        backgroundcolor="#5ACBA1"
        width="20%"
        data-testid="add-file"
      >
        {userState === true ? "Add File" : "Please Login First"}
      </CustomButton>
      <CustomButton
        onClick={AddGist}
        variant="contained"
        colorvalue="white"
        backgroundcolor="#5ACBA1"
        width="20%"
        data-testid="add-gist"
      >
        {userState ? (
          loading ? (
            <LoadingSpinner
              data-test-id="loading"
              width="10%"
              height="10%"
              color="white"
            />
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
