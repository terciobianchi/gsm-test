import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  typography: {
    // fontSize: 11
    htmlFontSize: 20,
  },
  palette: {
    primary: {
      main: '#FD7003',
      contrastText: "#fff"
    },
    secondary: {
      main: '#CE041C',
      contrastText: "#fff"
    },
    error: {
      main: '#f94567',
    },
    success: {
      main: '#2eb735',
    }
  }, 
  components: {
    //@ts-ignore - this isn't in the TS because DataGird is not exported from `@mui/material`
    MuiDataGrid: {
      styleOverrides: {
        row: {
          '&.Mui-selected': {
            backgroundColor: '#50b3fa73',
            fontWeight: 600,
            fontStyle: 'italic'
          },
        }        
      }
    },    
    
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#50b3fa73',
            fontWeight: 600,
            fontStyle: 'italic'
          },
        }
      }
    },
  } 
});

export default theme;
