/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Paper, Box } from '@mui/material';

const Footer = () => {
    return (
        <Paper sx={{flex: '50px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '400', borderRadius: 0, padding: '0px 10px', boxShadow: '0 1px 5px 0 rgb(51 51 51 / 14%)'}} elevation={1}>
            <Box>Versão {process.env.REACT_APP_VERSION} - Licenciado para {process.env.REACT_APP_LICENSE_TO}</Box>
        </Paper>
    )
};

export default Footer;
