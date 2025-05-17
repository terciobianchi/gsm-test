import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';    

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 999999,
  color: 'rgb(89, 203, 228)',
  },
}));

const LoadingOverlay = ({open}) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default React.memo(LoadingOverlay);