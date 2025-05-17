import React from 'react';

import { Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';    

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: '1 0', 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center',  
    justifyContent: 'center', 
    margin: '10px', 
    padding: '15px'
  },
}));

const AuthContainer = ({children, ...rest}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} elevation={1} {...rest}>
        {children}
    </Box>
  );
};

export default React.memo(AuthContainer);