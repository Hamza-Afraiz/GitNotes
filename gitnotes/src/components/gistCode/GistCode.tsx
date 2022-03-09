import React from 'react';
import { GistCodeContainer } from '../../styledComponents';
import { styled } from "@mui/material/styles";

interface GistCodeProps{
    GistCodeContent:string[]|undefined
}
export  const OrderedListItem = styled("li")(({theme}) => ({
    
    fontSize:"0.9em",
    [theme.breakpoints.down('md')]: {
      fontSize:"0.5em"
    },
    
  }));
const GistCode = ({GistCodeContent}:GistCodeProps) => {
    
    
    return (
        <GistCodeContainer>
            <ol>
                {GistCodeContent?.map((item,index)=>(
                    <OrderedListItem key={index}>
                        {item}
                    </OrderedListItem>
                ))}
            </ol>

        </GistCodeContainer>
    );
};

export default GistCode;