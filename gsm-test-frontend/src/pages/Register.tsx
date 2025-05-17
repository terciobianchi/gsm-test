/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Theme,
    Box,
    Typography,
    Button,
    TextField,
    Divider
} from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { makeStyles } from '@mui/styles';

import LoadingOverlay from '../components/common/LoadingOverlay';


import { errorHandle } from '../utils/callback-handle';

import { AppContext } from '../stores/AppStore';
import AuthContainer from '../components/common/AuthContainer';
import CardContainer from '../components/common/CardContainer';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '25rem',
        height: '28rem',
        padding: '2rem'

    },
}));

const Register = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const { showErrorMessage, showSuccessMessage, server } = useContext(AppContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [currentData, setCurrentData] = useState<any>({});

    const handleRegisterClick = async () => {
        try {
            setLoading(true);
            await server.auth.register(currentData);
            showSuccessMessage('Usuário registrado com sucesso!');
            navigate('/', {replace: false});
        } catch (error) {
            showErrorMessage(errorHandle(error));
        } finally {
            setLoading(false);
        }  
    };     

    const handleLoginClick = async () => {
        navigate('/', {replace: false});
    }; 

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const obj = {...currentData};
        obj[event.target.name] = event.target.value; 
        setCurrentData(obj);
    };    
    


    return (<AuthContainer>
        <CardContainer className={classes.card}>
            <Typography id="screen-title" gutterBottom color="primary" fontSize={20} sx={{fontWeight: 500, marginBottom: '3rem'}}>
                REGISTAR USUÁRIO
            </Typography>

            <TextField
                id="name"
                name="name"
                label="Nome"
                margin="dense"
                variant="outlined"
                size="small"
                fullWidth={true}
                required
                error={currentData.name !== undefined && !currentData.name}
                value={currentData.name || ''}
                onChange={handleInputChange}    >
            </TextField>

            <TextField
                id="username"
                name="username"
                label="Usuário"
                margin="dense"
                variant="outlined"
                size="small"
                type="email"
                fullWidth={true}
                required
                error={currentData.username !== undefined && !currentData.username}
                value={currentData.username || ''}
                onChange={handleInputChange}    >
            </TextField>

            <TextField
                id="password"
                name="password"
                label="Senha"
                margin="dense"
                variant="outlined"
                size="small"
                type="password"
                fullWidth={true}
                required
                error={currentData.password !== undefined && !currentData.password}
                value={currentData.password || ''}
                onChange={handleInputChange}    >
            </TextField>

            <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar Senha"
                margin="dense"
                variant="outlined"
                size="small"
                type="password"
                fullWidth={true}
                required
                error={currentData.confirmPassword !== undefined && !currentData.confirmPassword}
                value={currentData.confirmPassword || ''}
                onChange={handleInputChange}    >
            </TextField>

            <Divider sx={{marginTop: '4rem', marginBottom: 2, width: '100%'}} />

            <Box sx={{alignSelf: 'flex-end'}}>
                <Button sx={{marginRight: '5px'}} variant="contained" color="secondary" startIcon={<CancelIcon />} onClick={handleLoginClick}>Cancelar</Button>
                <Button id="button-confirm" disabled={!currentData.username || !currentData.password || !currentData.confirmPassword || (currentData.password !== currentData.confirmPassword)} variant="contained" color="success" startIcon={<HowToRegIcon />} onClick={handleRegisterClick}>Confirmar</Button>
            </Box>           
          
        </CardContainer>
        <LoadingOverlay open={loading} /> 
    </AuthContainer>);
};

export default Register;
