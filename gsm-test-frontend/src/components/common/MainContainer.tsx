import React from 'react';

import { Paper, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';    

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: '1 0', 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'stretch',  
    justifyContent: 'stretch', 
    margin: '10px', 
    padding: '15px',
    boxShadow: '0 1px 5px 0 rgb(51 51 51 / 14%) !important'
  },
}));

const MainContainer = ({children, ...rest}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={1} {...rest}>
        {children}
    </Paper>
  );
};

export default React.memo(MainContainer);