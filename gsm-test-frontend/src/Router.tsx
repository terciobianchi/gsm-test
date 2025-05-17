/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';

import LoadingOverlay from './components/common/LoadingOverlay';
import { AppContext } from './stores/AppStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';


const Router = () => {

    const { getSession, isLoading, } = useContext(AppContext);

    if (isLoading) {
        return <LoadingOverlay  open={true} />;
    }

    if (!getSession()) {
         return (<Routes>    
                <Route path="/" element={<Login/>} />            
                <Route path="/register" element={<Register/>} />                     
            </Routes>
        )        
    }

    return (<Routes>    
            <Route path="/" element={<Tasks/>} />                    
        </Routes>
    )
};

export default Router;
