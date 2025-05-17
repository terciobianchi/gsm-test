/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { 
    gridPageCountSelector,
    gridPageSelector,
    useGridSelector,    
    useGridApiContext } from '@mui/x-data-grid';

import { Pagination as MuiPagination } from '@mui/material';


const Pagination = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );        
}

export default Pagination;
