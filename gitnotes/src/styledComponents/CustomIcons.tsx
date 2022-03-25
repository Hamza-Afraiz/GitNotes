import { styled ,alpha} from "@mui/material/styles";
import GridIcon from "@mui/icons-material/Window";
import ListIcon from "@mui/icons-material/List";

interface CustomIconProps {
    sortingtype:string;
    
    
  }
  
  export const CustomGridIcon = styled(GridIcon)<CustomIconProps>(
    ({ sortingtype, theme }) => ({
      color:sortingtype === "grid" ? theme.color.primary : "lightgrey", 
  
     
      fontSize:"xlarge",
    
     
      "&:hover": {
        backgroundColor: alpha(theme.color.primary, 0.25),
        cursor:"pointer"
    
      },
    })
  );
  export const CustomListIcon = styled(ListIcon)<CustomIconProps>(
    ({ sortingtype, theme }) => ({
      color:sortingtype === "list" ? theme.color.primary : "lightgrey", 
  
     
      fontSize:"xlarge",
    
     
      "&:hover": {
        backgroundColor: alpha(theme.color.primary, 0.25),
        cursor:"pointer"
    
      },
    })
  );