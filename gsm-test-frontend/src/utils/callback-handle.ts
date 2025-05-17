
export const responseHandle = (response) => {
    const responseBody = response.data;
    return responseBody;
};

export const errorHandle = (error) => {
    let message = JSON.stringify(error); 
    if (error.response) {
        if (error.response.status === 401) {
            message = error.response.statusText;
        } else {
            message = error.response.data.message ? error.response.data.message :  error.response.data;
        }    
    } else  {
        message = error.message ? error.message : message; 
    }
    return message;    
};
