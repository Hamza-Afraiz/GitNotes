import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Snack } from "../../components";
import { useAppSelector } from "../../store/hooks";
import { useSearchQuery } from "../../Hooks";
import { fetchUserLoginDetails, LoggedOut } from "../../store/slices/user";
import {
  getStarredGistsData,
  getUserGistsData,
} from "../../store/slices/userGists";
import {
  CustomButton,
  SearchContainer,
  StyledInputBase,
} from "../../styledComponents";
import "./header.css";

function Header(props:any) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useAppSelector((state) => state.user.loggedIn);
  
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const userData = useAppSelector((state) => state.user.userData);
 

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSearch = () => {
   
     props.setSearchQueryValue(searchQuery)
    //navigate(`/`, { state: { route: "search", gistId: `${searchQuery}` } });
  };
  const handleClose = (navigationScreen: string) => {
    setAnchorEl(null);
    switch (navigationScreen) {
      case "profile":
        navigate(`/userProfile`);
        // code block
        break;
      case "starred":
        navigate(`/`, { state: { route: "starred" } });
        // code block
        break;
      case "createGist":
        navigate(`/createGist`);
        // code block
        break;
      default:
      // code block
    }
  };

  React.useEffect(() => {
    if (userState) {
      console.log("useEffect header")
      setLoading(false);
      dispatch(getUserGistsData());
      // GetGists().then(console.log)
      dispatch(getStarredGistsData());
      setOpenModal(userState);
    }
  }, [userState,dispatch]);

  const handleCloseModal = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenModal(false);
  };
  const ClearSearchQuery=()=>{
    props.setSearchQueryValue("")
    setSearchQuery("")
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Snack openModal={openModal} handleCloseModal={handleCloseModal} />
      <AppBar sx={{ backgroundColor: "#5ACBA1" }} position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            EMUMBA
          </Typography>
          <SearchContainer>
            <div className="searchIconWrapper" onClick={handleSearch}>
              <SearchIcon />
            </div>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setSearchQuery(event.target.value);
              }}
              
            />
            {searchQuery && <div className="closeIconWrapper" onClick={ClearSearchQuery}>
              <CloseIcon />
            </div> }
            
          </SearchContainer>
          {loading === true ? (
            <div className="profilePicDiv">
              <Oval height="30" width="30" color="white" ariaLabel="loading" />
            </div>
          ) : userState === true ? (
            <div className="profilePicDiv">
              <img
                className="profilePic"
                src={userData.ownerAvatar}
                alt="profile"
                onClick={handleClick}
              />
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem style={{justifyContent:'space-between'}}> 
                <img
                className="profilePic"
                src={userData.ownerAvatar}
                alt="profile"
                onClick={handleClick}
              />
                {userData.ownerName}</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose("profile");
                  }}
                >
                  Your Gists
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose("starred");
                  }}
                >
                  Starred Gists
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose("createGist");
                  }}
                >
                  Create A Gist
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(LoggedOut());
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="profilePicDiv">
              <CustomButton
                onClick={() => {
                  dispatch(fetchUserLoginDetails());
                  setLoading(true);
                }}
                variant="contained"
                colorValue="#5ACBA1"
                backgroundColor="white"
              >
                Login
              </CustomButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
