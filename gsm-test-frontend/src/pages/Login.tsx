/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Theme,
    Box,
    Typography,
    Button,
    TextField,
    Divider
} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
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
        height: '22rem',
        padding: '2rem'

    },
}));

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const { showErrorMessage, showSuccessMessage, signIn } = useContext(AppContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [currentLogin, setCurrentLogin] = useState<any>({});

    useEffect(() => { 
    }, []);

    const handleLoginClick = async () => {       
        try {
            setLoading(true);
            await signIn(currentLogin);
            showSuccessMessage('Usuário logado com sucesso!');
        } catch (error) {
            showErrorMessage(errorHandle(error));
        } finally {
            setLoading(false);
        }
    }; 

    const handleRegisterClick = async () => {
        navigate('/register', {replace: false});
    };     

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const obj = {...currentLogin};
        obj[event.target.name] = event.target.value; 
        setCurrentLogin(obj);
    };    

    return (<AuthContainer>
        <CardContainer className={classes.card}>
            <Typography id="screen-title" gutterBottom color="primary" fontSize={20} sx={{fontWeight: 500, marginBottom: '3rem'}}>
                LOGIN DO USUÁRIO
            </Typography>

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
                error={currentLogin.username !== undefined && !currentLogin.username}
                value={currentLogin.username || ''}
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
                error={currentLogin.password !== undefined && !currentLogin.password}
                value={currentLogin.password || ''}
                onChange={handleInputChange}    >
            </TextField>

            <Divider sx={{marginTop: '4rem', marginBottom: 2, width: '100%'}} />

            <Box sx={{alignSelf: 'flex-end'}}>
                <Button id="button-login"  disabled={!currentLogin.username || !currentLogin.password} sx={{marginRight: '5px'}} variant="contained" color="secondary" startIcon={<LoginIcon />} onClick={handleLoginClick}>Logar</Button>
                <Button variant="contained" color="primary" startIcon={<HowToRegIcon />} onClick={handleRegisterClick}>Registrar</Button>
            </Box>           

        </CardContainer>
        <LoadingOverlay open={loading} /> 
    </AuthContainer>);
};

export default Login;
