import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { MutatingDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { fetchUserLoginDetails, LoggedOut } from "../../store/slices/user";
import {
  getStarredGistsData,
  getUserGistsData,
} from "../../store/slices/userGists";
import {
  ColorButton,
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from "../../styledComponents";
import "./header.css";

function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const userData = useAppSelector((state) => state.user.userData);
  const userState = useAppSelector((state) => state.user.loggedIn);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (navigationScreen: string) => {
    setAnchorEl(null);
    switch (navigationScreen) {
      case "profile":
        navigate(`/userProfile`);
        // code block
        break;
      case "starred":
        console.log("navigated to starred profile");
        navigate(`/`, { state: { route: "starred" } });
        // code block
        break;
      case "createGist":
        console.log("navigated to createGist profile");
        navigate(`/createGist`);
        // code block
        break;
      default:
      // code block
    }
  };

  React.useEffect(() => {
    console.log("giving effect ");
    console.log("user value is ", userState);
    if (userState) {
      setLoading(false);
      dispatch(getUserGistsData());
      // GetGists().then(console.log)
      dispatch(getStarredGistsData());
    }
  }, [userState]);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchContainer>
          {loading === true ? (
            <MutatingDots
              height="100"
              width="100"
              color="white"
              ariaLabel="loading"
            />
          ) : userState === true ? (
            <div style={{ borderRadius: "50%" }}>
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
                open={open}
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
                <MenuItem>Signed In As {userData.ownerName}</MenuItem>
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
            <ColorButton
              onClick={() => {
                dispatch(fetchUserLoginDetails());
                setLoading(true);
              }}
              variant="contained"
            >
              Login
            </ColorButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
