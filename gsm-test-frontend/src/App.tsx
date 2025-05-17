import React from 'react';
import { HashRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppProvider } from './stores/AppStore';
import { Box } from '@mui/material';
import Router from './Router';
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import theme from './utils/theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppProvider>
              <HashRouter>
                <Box sx={{ backgroundColor: '#f0f2f5', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'stretch', height: '100vh' }}>
                    <Header />
                    <Box sx={{flex: '1 0', display: 'flex', flexDirection: 'row', alignItems: 'stretch',  justifyContent: 'stretch',  margin: '0px', padding: '0px'}}>
                        <Router />
                    </Box>
                    <Footer />    
                </Box>
              </HashRouter>
            </AppProvider>

        </ThemeProvider>
    );
};

export default App;
