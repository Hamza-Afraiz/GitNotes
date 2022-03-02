import { styled } from '@mui/material/styles';
import React from 'react';
import {GistCodeContainer} from '../../styledComponents'


interface GistCodeProps{
    GistCodeContent:string[]|undefined
}
const GistCode = ({GistCodeContent}:GistCodeProps) => {
    
    
    return (
        <GistCodeContainer>
            <ol>
                {GistCodeContent?.map((item,index)=>(
                    <li key={index}>
                        {item}
                    </li>
                ))}
            </ol>

        </GistCodeContainer>
    );
};

export default GistCode;