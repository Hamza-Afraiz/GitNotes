import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Snack, MenuItems } from "../../components";
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
  const theme = useTheme();

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

  const SearchGist = () => {
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
  const LogoutUser = () => {
    dispatch(LoggedOut());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Snack
        LogInNotification={LogInNotification}
        CloseLogInNotification={CloseLogInNotification}
      />
      <AppBar sx={{ backgroundColor: theme.color.primary }} position="static">
        <Toolbar>
          <ArrowBackIcon
            onClick={() => {
              navigate(-1);
            }}
          />
          <HomeIcon
            onClick={() => {
              navigate("/");
            }}
          />

          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { md: "none", xs: "none", sm: "none", lg: "block" },
              marginLeft: "2%",
            }}
          >
            EMUMBA
          </Typography>

          {/* SEARCH CONTAINER CONTAINING INPUT ,AND SEARCH HANDLING OPTIONS */}
          <SearchContainer>
            <div className="searchIconWrapper" onClick={SearchGist}>
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

          {/* IF USER HAS SUCCESSFULLY LOGGED IN ,BASED ON USER STATE PROFILE PIC LL BE SHOWN INSTEAD OF 
         LOGIN BUTTON AND UPON CLICKING PIC ,MENU ITEMS LL APPEAR */}

          {loading === true ? (
            <div className="profilePicDiv">
              <CircularProgress color="success" />
            </div>
          ) : userState === true ? (
            <div className="profilePicDiv">
              <img
                className="profilePic"
                src={userData.ownerAvatar}
                alt="profile"
                onClick={openMenu}
              />

              <MenuItems
                closeMenu={closeMenu}
                openMenu={openMenu}
                userData={userData}
                menuElement={menuElement}
                LoggedOut={LogoutUser}
              />
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
