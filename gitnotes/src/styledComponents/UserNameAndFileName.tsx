import { styled } from "@mui/material/styles";
export const UserNameAndFileName = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    color:'blue',
    fontSize:"1em",
    [theme.breakpoints.down('md')]: {
      fontSize:"0.5em"
    },


  }));
  export  const PlainText = styled("div")(({theme}) => ({
    display: "flex",
   
    color:'grey',
    fontSize:"0.9em",
    [theme.breakpoints.down('md')]: {
      fontSize:"0.5em"
    },
    
  }));