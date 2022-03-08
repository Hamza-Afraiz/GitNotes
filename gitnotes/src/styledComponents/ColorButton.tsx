import Button, { ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";

interface CustomButtonProps{
  colorValue:string;
  backgroundColor:string;
 

}
export const CustomButton = styled(Button)<CustomButtonProps>(({colorValue,backgroundColor }) => ({
    color: colorValue,
   
    backgroundColor: backgroundColor,
    width: "40%",
  marginTop: "5%",
   
  
  }));