import { TailSpin } from "react-loader-spinner";
interface LoadingSpinnerProps{
    width:string;
    height:string;
    color:string
}

export const LoadingSpinner = ({width,height,color}:LoadingSpinnerProps) => {
    return (
      <div style={{marginLeft:'10%'}}>
        <TailSpin
          height={height}
          width={width}
          color={color}
          ariaLabel="loading"
        />
      </div>
    );
  };