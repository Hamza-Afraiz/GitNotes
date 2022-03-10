import CircularProgress from '@mui/material/CircularProgress';

interface LoadingSpinnerProps{
    width:string;
    height:string;
    color:string
}

export const LoadingSpinner = ({width,height,color}:LoadingSpinnerProps) => {
    return (
      <div style={{marginLeft:'10%'}}>
         <CircularProgress sx={{width:width,height:height,color:color}} />
      </div>
    );
  };