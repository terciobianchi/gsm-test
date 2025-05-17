/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Snackbar, 
        Box, 
        Paper, 
        Tabs, 
        Tab, 
        Typography,
        Button} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import { AppContext } from '../../stores/AppStore'
import TaskIcon from '@mui/icons-material/Task';
import LogoutIcon from '@mui/icons-material/Logout';

interface LinkTabProps {
    label: string;
    value: string;
    icon: React.ReactElement
}

const LinkTab = (props: LinkTabProps) => (
    <Tab
        component="a"
        iconPosition="start"
        sx={{textTransform: 'none', fontSize: '14px', marginRight: '20px', minHeight: '0px'}}
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault();
        }}
        {...props}
    />
);

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentTab, seCurrentTab] = React.useState<string>('/');
    const { applicationMessage, setApplicationMessage, getSession, signOut } = useContext(AppContext);
 

    useEffect(() =>  {
        seCurrentTab(location.pathname);
    }, [location]);

    useEffect(() =>  {
        // if (applicationMessage && applicationMessage.message && (applicationMessage.message.indexOf('Invalid Security Token') !== -1 || applicationMessage.message.indexOf('Unauthorized') !== -1)) {
        //     signOut();  
        // } else
        if (applicationMessage && applicationMessage.message && applicationMessage.message.indexOf('Sessão Exprirada') !== -1) {
            // refreshSession();  
        }
    }, [applicationMessage]);
           

    
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        navigate(newValue, {replace: false});
    }; 
    
    const handleLogout = (event: React.SyntheticEvent, newValue: string) => {
        signOut();
        window.location.reload();
    }; 

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setApplicationMessage(null);
    };

    return (
        <>   
            <Paper sx={{flex: '60px 0', display: 'flex', flexDirection: 'row', alignItems: 'stretch',  justifyContent: 'stretch', borderRadius: 0, boxShadow: '0 1px 5px 0 rgb(51 51 51 / 14%)'}} elevation={1}>
                <Box sx={{flex: '280px 0', display: 'flex', alignItems: 'center',  justifyContent: 'center', margin: '0px' }}>
                    <Typography color="primary" fontSize={24} sx={{fontWeight: 500}}>
                        GSM TEST
                    </Typography>
                </Box>

                {getSession() && <Tabs value={currentTab} onChange={handleTabChange} variant="scrollable" aria-label="nav tabs" sx={{flex: '1 0', marginTop: '12px', marginLeft: '20px'}}>
                    <LinkTab label="Tasks" value="/" icon={<TaskIcon/>}/>                       
                </Tabs> }     

                {getSession() && <Box sx={{flex: '80px 0', display: 'flex', margin: '15px'}}>
                    <Button id="button-logout" variant="contained" color="secondary" startIcon={<LogoutIcon />} onClick={handleLogout}>Logout</Button>
                </Box>}
            </Paper>

            <Snackbar open={applicationMessage ? true : false} autoHideDuration={6000} onClose={handleCloseMessage} anchorOrigin={{vertical: 'top', horizontal: 'center'} } sx={{ width: '50%' }} >
                { applicationMessage && <div><Alert id="application-message" onClose={handleCloseMessage} severity={applicationMessage.type} sx={{ width: '100%', color: '#fff' }}>
                    {applicationMessage.message}
                </Alert></div> }
            </Snackbar> 
        </>
    )
};

export default Header;
