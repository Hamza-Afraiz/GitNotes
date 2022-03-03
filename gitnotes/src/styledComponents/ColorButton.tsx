import Button, { ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";


export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#5ACBA1",
    backgroundColor: alpha(theme.palette.common.white, 0.95),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.65),
    },
  }));