import  React,{useEffect} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import ForkIcon from '@mui/icons-material/ForkRight';
import StarIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ProfileImageAndName } from '../components'


import { useNavigate } from "react-router-dom";
export const GistsListColumns  : GridColDef[] = [
    {
        field: 'name', headerName: 'Name', width: 220, headerClassName: 'colored',
        renderCell:(params: GridValueGetterParams)=><ProfileImageAndName avatar_url={params.row.avatar_url} ownerName={params.row.name}/>
    
    }
        
        ,
    {
        field: 'date',
        headerName: 'Date',
        headerClassName: 'colored',
        width: 150,
        editable: true,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.date } `,
    },
  
    {
        field: 'time',
        headerName: 'Time',
        headerClassName: 'colored',
        width: 150,
        editable: true,
    },
    {
        field: 'keyword',
        headerName: 'Keyword',
        headerClassName: 'colored',

        width: 310,
        editable: true,
    },
    {
        field: 'noteBookName',
        headerName: 'NoteBook ',
        headerClassName: 'colored',

        sortable: false,
        width: 260,
       
    },
    {
        field: 'icon',
        headerName: 'Options',
        headerClassName: 'colored',

        width: 110,
        editable: true,
        renderCell: () => <IconsRow>

            <ForkIcon sx={{ color: "#5ACBA1" }} />
            <StarIcon sx={{ color: "#5ACBA1" }} />
        </IconsRow>
    },
    {
        field: 'ownerAvatar',
        headerName: '',
        headerClassName: 'ownerAvatar',

        sortable: false,
        width: 0,
       
    },

];
const IconsRow = styled('div')(() => ({
    display: "flex",
    flexDirection: 'row',






}));
