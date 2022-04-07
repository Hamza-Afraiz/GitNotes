import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import { TypographyProps } from "@mui/material";



export const LogoText = styled(Typography)<TypographyProps>(
  ({ variant, theme }) => ({
    marginLeft: "1%",
    variant,
    component: "div",
    "&:hover": {
      backgroundColor: alpha(theme.color.primary, 0.25),
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  })
);
