import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
declare module '@mui/material/styles' {
    interface Theme {
      color: {
        primary: string;
        secondary:string
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      color?: {
        primary?: string;
        secondary?:string
      };
    }
  }
  export const theme = createTheme({
    color: {
        primary:"#5ACBA1",
        secondary:"white"
     
    },
  });