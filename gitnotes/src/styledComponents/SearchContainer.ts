import { alpha, styled } from "@mui/material/styles";
export const SearchContainer = styled("div")(({ theme }) => ({
    position: "relative",
    display:"flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
  
    minWidth: "30%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "50%",
      width: "auto",
    },
  }));