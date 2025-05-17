/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo, useState, useEffect } from 'react';

import {
    Theme,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    TextField,
    MenuItem,
    Switch} from '@mui/material';

import { DataGrid, GridActionsCellItem, GridEventListener } from '@mui/x-data-grid';

import { makeStyles } from '@mui/styles';

import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import LoadingOverlay from '../components/common/LoadingOverlay';
import Pagination from '../components/common/Pagination';

import { responseHandle, errorHandle } from '../utils/callback-handle';

import { AppContext } from '../stores/AppStore';
import MainContainer from '../components/common/MainContainer';

const useStyles = makeStyles((theme: Theme) => ({
    switchField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '200px'
    },
}));

const status = [
    {
        value: 'T',
        label: 'Listar todas as tasks',
    },    
    {
        value: 'P',
        label: 'Listar tasks pendentes',
    },
    {
        value: 'C',
        label: 'Listar tasks concluídas',
    }
];

const Tasks = () => {
    const classes = useStyles();

    const { showErrorMessage, showSuccessMessage, server } = useContext(AppContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [tasksData, setTasksData] = useState<Array<any>>([]);
    const [openDialogSave, setOpenDialogSave] = useState<boolean>(false);
    const [openDialogRemove, setOpenDialogRemove] = useState<boolean>(false);
    const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false);    
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [currentStatus, setCurrentStatus] = useState<string>('T');    
    const [init, setInit] = useState<boolean>(false);

    useEffect(() => {
        if (!init) {
            setInit(true);
        }
    }, []);

    useEffect(() => {
        if (init) {
            setLoading(true)            
            const hydrate = async () => {
                await loadData();
            };

            hydrate().catch(err => {
                showErrorMessage(errorHandle(err));
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [init, currentStatus]);

    const loadData = async () => {
        try {
            const filters = currentStatus !== 'T' ? {status: currentStatus } : {};
            const response = await server.tasks.get(filters);
            const data = responseHandle(response);
            setTasksData(data);
        } catch (error) {
            throw error;
        }
    }

    const handleRefreshClick = async () => {
        try {
            setLoading(true);
            await loadData();
        } catch (error) {
            showErrorMessage(errorHandle(error));
        } finally {
            setLoading(false);
        }
    };

    const handleCloseClick = async () => {
        setOpenDialogSave(false);
        setOpenDialogRemove(false);
        setOpenDialogUpdate(false);        
        setCurrentTask(null);
    };

    const handleOpenDialogRemoveClick = (id: any) => async () => {
        const currentTask = tasksData.find(x => x.id === id);
        if (currentTask) {
            setCurrentTask(currentTask);
            setOpenDialogRemove(true);
        }
    };

    const handleOpenDialogUpdateClick = (id: any) => async () => {
        const currentTask = tasksData.find(x => x.id === id);
        if (currentTask) {
            setCurrentTask(currentTask);
            setOpenDialogUpdate(true);
        }
    };

    const handleOpenDialogAddClick = async () => {
        setCurrentTask({ status: 'P' });
        setOpenDialogSave(true);
    };

    const handleLogsRowClick: GridEventListener<'rowClick'> = (params) => {
    };

    const handleTaskRemoveClick = async () => {
        try {
            setLoading(true);
            await server.tasks.remove(currentTask.id);
            showSuccessMessage('Task removida com sucesso!');
            setOpenDialogRemove(false);
            await loadData();
        } catch (error) {
            showErrorMessage(errorHandle(error));
        } finally {
            setLoading(false);
        }
    }

    const handleTaskSaveClick = async () => {
        try {
            setLoading(true);
            const obj = { ...currentTask };
            const response = await server.tasks.save(obj);
            const data = responseHandle(response);            
            showSuccessMessage(`Task "${data.title}" criada com sucesso!`);
            setOpenDialogSave(false);
            await loadData();
        } catch (error) {
            showErrorMessage(errorHandle(error));
        } finally {
            setLoading(false);
        }
    };

    const handleTaskUpdateClick = async () => {
        try {
            setLoading(true);
            const obj = {title: currentTask.title, status: currentTask.status };
            const response = await server.tasks.update(currentTask.id, obj);
            const data = responseHandle(response);            
            showSuccessMessage(`Task "${data.title}" atualizada com sucesso!`);
            setOpenDialogUpdate(false);
            await loadData();
        } catch (error) {
            showErrorMessage(errorHandle(error));
        } finally {
            setLoading(false);
        }
    };    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const task = { ...currentTask };
        task[event.target.name] = event.target.value;
        setCurrentTask(task);
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const task = { ...currentTask };
        task[event.target.name] = event.target.checked ? 'C' : 'P';
        setCurrentTask(task);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setCurrentStatus(event.target.value);
    };    

    const renderDialogRemove = useMemo(() => <Dialog fullWidth={true} maxWidth="sm" open={openDialogRemove} onClose={handleCloseClick}>
        <DialogTitle>Remover Task</DialogTitle>
        <DialogContent>
            {`Deseja remover a task ${currentTask?.title}?`}
        </DialogContent>
        <DialogActions>
            <Button sx={{ marginRight: '5px' }} onClick={handleCloseClick}>Cancelar</Button>
            <Button id="button-confirm-delete-task" onClick={handleTaskRemoveClick}>Confirmar</Button>
        </DialogActions>
    </Dialog>, [openDialogRemove, currentTask]);

    const renderDialogUpdate = useMemo(() => <Dialog fullWidth={true} maxWidth="md" open={openDialogUpdate} onClose={handleCloseClick}>
        {currentTask && <>
            <DialogTitle>{currentTask.id ? 'Editar Task' : 'Nova Task'}</DialogTitle>
            <DialogContent>
               <TextField
                    id="title"
                    name="title"
                    label="Título"
                    margin="dense"
                    variant="outlined"
                    size="small"
                    required
                    error={currentTask.title !== undefined && !currentTask.title}
                    value={currentTask.title || ''}
                    onChange={handleInputChange}
                    slotProps={{ htmlInput: { maxLength: 50 } }}
                    fullWidth>
                </TextField>

                <div className={classes.switchField}>
                    <Switch 
                        id="status"
                        name="status" 
                        checked={currentTask.status === 'C' ? true : false}
                        onChange={handleSwitchChange}  
                        color="primary" />
                    Concluída
                </div>

            </DialogContent>
            <DialogActions>
                <Button sx={{ marginRight: '5px' }} onClick={handleCloseClick}>Cancelar</Button>
                <Button id="button-confirm-update-task" disabled={
                    !currentTask.title} onClick={handleTaskUpdateClick}>Salvar</Button>
            </DialogActions>
        </>}
    </Dialog>, [openDialogUpdate, currentTask]);

    const renderDialogSave = useMemo(() => <Dialog fullWidth={true} maxWidth="md" open={openDialogSave} onClose={handleCloseClick}>
        {currentTask && <>
            <DialogTitle>{currentTask.id ? 'Editar Task' : 'Nova Task'}</DialogTitle>
            <DialogContent>
                <TextField
                    id="title"
                    name="title"
                    label="Título"
                    margin="dense"
                    variant="outlined"
                    size="small"
                    required
                    error={currentTask.title !== undefined && !currentTask.title}
                    value={currentTask.title || ''}
                    onChange={handleInputChange}
                    slotProps={{ htmlInput: { maxLength: 50 } }}
                    fullWidth>
                </TextField>

                <TextField
                    id="description"
                    name="description"
                    label="Descrição"
                    margin="dense"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={10}                    
                    required
                    error={currentTask.description !== undefined && !currentTask.description}
                    value={currentTask.description || ''}
                    onChange={handleInputChange}
                    fullWidth>
                </TextField>

            </DialogContent>
            <DialogActions>
                <Button sx={{ marginRight: '5px' }} onClick={handleCloseClick}>Cancelar</Button>
                <Button id="button-confirm-add-task" disabled={
                    !currentTask.title ||
                    !currentTask.description} onClick={handleTaskSaveClick}>Salvar</Button>
            </DialogActions>
        </>}
    </Dialog>, [openDialogSave, currentTask]);

    const renderGrid = useMemo(() => <Box sx={{ flex: '1 0', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'stretch' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 1 }}>
            <Typography id="screen-title" gutterBottom color="primary" sx={{ fontWeight: 500 }}>
                LISTA DE TASKS
            </Typography>
            <Box sx={{width: '40rem'}}>
                <TextField
                    id="select-status"
                    select
                    margin="dense"
                    variant="outlined"
                    size="small"                
                    value={currentStatus}
                    fullWidth
                    onChange={handleStatusChange}    >
                        { status.map((option) => (
                            <MenuItem id={"select-status-"+option.value} key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                </TextField>                
            </Box>            
            <Box>
                <Button sx={{ marginRight: '5px' }} variant="contained" color="secondary" startIcon={<RefreshIcon />} onClick={handleRefreshClick}>Atualizar</Button>
                <Button id="button-add-task" variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialogAddClick}>Nova Task</Button>
            </Box>
        </Box>

        <DataGrid
            sx={{ flex: '1 0' }}
            density="compact"
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 23, page: 0 },
                },
            }}
            rowHeight={45}
            columns={[
                {
                    field: 'actions',
                    type: 'actions',
                    width: 110,
                    getActions: (params) => [
                        <GridActionsCellItem
                            id="button-delete-task"
                            icon={<DeleteIcon />}
                            label="Excluir"
                            onClick={handleOpenDialogRemoveClick(params.id)}
                        />,
                        <GridActionsCellItem
                            id="button-edit-task"
                            icon={<EditIcon />}
                            label="Editar"
                            onClick={handleOpenDialogUpdateClick(params.id)}
                        />,
                    ],
                },
                { field: 'title', headerName: 'Título', width: 200 },
                { field: 'description', headerName: 'Descrição', width: 500 },
                {
                    field: 'status', headerName: 'Status', width: 70, renderCell: (params) => (
                        <>
                            {params.value === 'C' ? <CheckCircleIcon fontSize='small' color="success" sx={{ marginRight: 1 }} /> : <CheckCircleIcon fontSize='small' color="error" sx={{ marginRight: 1 }} />}
                        </>
                    )
                },

                { field: 'createdAt', headerName: 'Data Criação', width: 200 },
                { field: 'userName', headerName: 'Usuário', width: 200 },
            ]}
            rows={tasksData}
            getRowId={(row) => row.id}
            components={{ Pagination: Pagination }}
            onRowClick={handleLogsRowClick} />
    </Box>, [tasksData, currentStatus, loading]);

    return (<MainContainer>
        {renderGrid}
        {renderDialogSave}
        {renderDialogUpdate}        
        {renderDialogRemove}
        <LoadingOverlay open={loading} />
    </MainContainer>);
};

export default Tasks;
