import { styled } from "@mui/material/styles";

export const GistCodeLine = styled("li")(({ theme }) => ({
  fontSize: "0.9em",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.5em",
  },
}));
