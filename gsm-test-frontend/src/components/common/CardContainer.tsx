import React from 'react';

import { Paper, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';    

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '5px', 
    padding: '10px',
    boxShadow: '0 1px 5px 0 rgb(51 51 51 / 14%) !important'
  },
}));

const CardContainer = ({children, ...rest}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={1} {...rest}>
        {children}
    </Paper>
  );
};

export default React.memo(CardContainer);