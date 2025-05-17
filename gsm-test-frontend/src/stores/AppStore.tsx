import React, { useState } from 'react';

import axios from 'axios';
import  Cookies from 'js-cookie';
import LoadingOverlay from '../components/common/LoadingOverlay';


//@ts-ignore
const initialState: any = {
};

export const AppContext = React.createContext(initialState);

const SESSION_TOKEN = 'gsm.session';

export const AppProvider = ({ children }) => {
    
    const [applicationMessage, setApplicationMessage] = useState(null);   
    const [isLoading, setLoading] = useState(false);

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    api.interceptors.request.use (
        request => {
            const token = getSession()?.accessToken;
            if (token) {
                request.headers['Authorization'] = `Bearer ${token}`;
            }
            return request
        },
        error => {
            return Promise.reject(error)
        }
    );      
   
    const server = {
        auth: { 
            login: async (login)  => {
                return api.post('/auth/login', login);
            },
            register: async (data)  => {
                return api.post('/auth/register', data);
            }                   
        },
        tasks: {
            get: async (filters?: any)  => {
                return  api.get('/tasks'+extractFilters(filters));
            },    
            save: async (values)  => {
                return api.post('/tasks', values);
            },  
            update: async (id, values)  => {
                return api.patch('/tasks/'+id, values);
            },            
            remove: async (id)  => {
                return api.delete('/tasks/'+id);
            }    
        },  
    }

    const extractFilters = (filters: any) => {
        let result = ''
        let flag = '?';
        if (filters) {
            for (const key of Object.keys(filters)) {
                result += flag + key + '=' + filters[key];
                flag = '&';
            }
        }
        return result;
    }


    const signIn = async (login) => {
        const response = await server.auth.login(login);
        const now = new Date();
        const expirationTime = new Date(now.getTime() + 60 * 60 * 1000); // Current time + 1 hour
        Cookies.set(SESSION_TOKEN, JSON.stringify(response.data), { expires: expirationTime });        
    };

    const signOut = () => {
        setLoading(false);
        Cookies.remove(SESSION_TOKEN);    
    };
    
    const getSession = () : any => {
        const session = Cookies.get(SESSION_TOKEN);    
        if (session) {
            return JSON.parse(session);
        }
        return null;
    };

    const showSuccessMessage = (message) => {
        setApplicationMessage({type: 'success', message: message})
    };

    const showErrorMessage = (message) => {
        setApplicationMessage({type: 'error', message: message})
    };

    const showWarningMessage = (message) => {
        setApplicationMessage({type: 'warning', message: message})
    };

    const showInfoMessage = (message) => {
        setApplicationMessage({type: 'info', message: message})
    };
    

    const renderStore = isLoading ?
    <LoadingOverlay open={true} />
    :
    <AppContext.Provider value={{
        ...initialState,
        applicationMessage, 
        setApplicationMessage,
        showSuccessMessage,
        showErrorMessage,
        showWarningMessage,
        showInfoMessage,
        getSession,
        signIn,
        signOut,
        server}}>
        {children}
    </AppContext.Provider>;

  return renderStore;
};
