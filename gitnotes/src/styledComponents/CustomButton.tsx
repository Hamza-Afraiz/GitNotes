import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";

interface CustomButtonProps {
  colorvalue: string;
  backgroundcolor: string;
  width: string;
}

export const CustomButton = styled(Button)<CustomButtonProps>(
  ({ colorvalue, backgroundcolor, width, theme }) => ({
    color: colorvalue,

    backgroundColor: backgroundcolor,
    width: width,
    marginTop: "5%",
    "&:hover": {
      backgroundColor: alpha(theme.color.primary, 0.25),
      color: backgroundcolor,
    },
  })
);
