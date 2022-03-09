import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
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

function Header(props: any) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useAppSelector((state) => state.user.loggedIn);
  const userData = useAppSelector((state) => state.user.userData);

  const [loading, setLoading] = React.useState(false);
  const [LogInNotification, setLogInNotification] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [menuElement, setMenuElement] = React.useState<null | HTMLElement>(
    null
  );

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuElement(event.currentTarget);
  };

  const handleSearch = () => {
    props.setSearchQueryValue(searchQuery);
    navigate(`/`);
  };

  const closeMenu = (navigationScreen: string) => {
    setMenuElement(null);

    switch (navigationScreen) {
      case "profile":
        navigate(`/userProfile`);

        break;
      case "starred":
        navigate(`/`);
        props.setStarredGists(true);

        break;
      case "createGist":
        navigate(`/createGist`);

        break;
      default:
    }
  };

  React.useEffect(() => {
    if (userState) {
      setLoading(false);
      dispatch(getUserGistsData());

      dispatch(getStarredGistsData());
      setLogInNotification(userState);
    }
  }, [userState, dispatch]);

  const CloseLogInNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setLogInNotification(false);
  };
  const ClearSearchQuery = () => {
    props.setSearchQueryValue("");
    setSearchQuery("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Snack
        LogInNotification={LogInNotification}
        CloseLogInNotification={CloseLogInNotification}
      />
      <AppBar sx={{ backgroundColor: "#5ACBA1" }} position="static">
        <Toolbar>
          <Typography
            variant="h6"
            
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            EMUMBA
          </Typography>




          {/* SEARCH CONTAINER CONTAINING INPUT ,AND SEARCH HANDLING OPTIONS */}
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
            {searchQuery && (
              <div className="closeIconWrapper" onClick={ClearSearchQuery}>
                <CloseIcon />
              </div>
            )}
          </SearchContainer>

         {/* IF USER HAS SUCCESSFULLY LOGGED IN BASED ON USER STATE PROFILE PIC LL BE SHOWN INSTEAD OF 
         LOGIN BUTTON AND UPON CLICKING PIC ,MENU ITEMS LL APPEAR */}

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
                onClick={openMenu}
              />
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={menuElement}
                open={Boolean(menuElement)}
                onClose={closeMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem style={{ justifyContent: "space-between" }}>
                  <img
                    className="profilePic"
                    src={userData.ownerAvatar}
                    alt="profile"
                    onClick={openMenu}
                  />
                  {userData.ownerName}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenu("profile");
                  }}
                >
                  Your Gists
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenu("starred");
                  }}
                >
                  Starred Gists
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenu("createGist");
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
                colorvalue="#5ACBA1"
                backgroundcolor="white"
                width="20%"
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
