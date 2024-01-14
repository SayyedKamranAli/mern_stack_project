import React, { useState, useEffect } from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DataGridPro } from "@mui/x-data-grid-pro"
import TopBar from './TopBar';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CancelIcon from '@mui/icons-material/Cancel';
import Sidebar from './Sidebar';
import { SHOW_SUCCESS_NOTIFICATION } from '../../apputils/apputils';

import {
    Box, Button, Dialog, DialogActions, DialogContent,
    TextField, Typography, Grid,
    DialogContentText, DialogTitle, CircularProgress, IconButton,
    Checkbox, FormControlLabel
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, updateUser } from '../../actions/userAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const useStyles = makeStyles((theme) => ({
    // hello
    // hello yash
    // hello i am abhay
    // kumar

    contentContainer: {
        paddingTop: theme.spacing(8), // Add top padding to create space between TopBar and content
        backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
        color: theme.palette.mode === 'dark' ? 'white' : 'black',
        minHeight: '100vh',
    },
}));






export default function UsersPage() {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.allUsers)
    const { isUpdated, message } = useSelector((state) => state.profile)




    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const [isBlockDialogOpen, setIsBlockDialogOpen] = React.useState(false);
    const [blockConfirmation, setBlockConfirmation] = React.useState(false);

    const [userIdToBlock, setUserIdToBlock] = React.useState(null);

    const [formData, setFormData] = React.useState({
        email: '',
        name: '',
        role: '',
        isBlocked: false


    });


    const [editRowData, setEditRowData] = React.useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleEdit = (id) => {
        console.log('id checking', id)
        setUserIdToBlock(id)
        // Find the row with the given ID from the rows array
        const editedRow = rows.find((row) => row.id === id);
        console.log('row data', editedRow)

        if (editedRow) {

            setEditRowData(editedRow);

            setFormData({
                email: editedRow.email,
                name: editedRow.name,
                role: editedRow.role,
                isBlocked: editedRow.blockUser

            });

            // if(editedRow.blockUser){


            // }


            setIsEditModalOpen(true);
            console.log("Editing Row:", editedRow);
        }
    };

    useEffect(() => {

        dispatch(getAllUsers())




    }, [isUpdated,isBlockDialogOpen]);


    const handleUpdate = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Find the index of the edited row in the rows array
            const rowIndex = rows.findIndex((row) => row.id === editRowData.id);

            if (rowIndex !== -1) {

                const updatedUserData = {
                    // id: editRowData.id,
                    email: formData.email,
                    name: formData.name,
                    role: formData.role,

                };


                dispatch(updateUser(editRowData.id, updatedUserData))

                // setRows(updatedRows);
                // SHOW_SUCCESS_NOTIFICATION(message)
                // toast('salksfjljlkj')
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

            // Reset the form data and close the edit modal
            setFormData({
                email: '',
                name: '',
                role: '',
                // createdby: '',
            });
            setIsEditModalOpen(false);
        }, 1500);
    };


    const handleOpenBlockDialog = (id) => {
        setUserIdToBlock(id);
        const editedRow = rows.find((row) => row.id === id);

        console.log('handleOpenBlockDialog', editedRow)

        if (editedRow) {

            setEditRowData(editedRow);

            setFormData({
                email: editedRow.email,
                name: editedRow.name,
                role: editedRow.role,
                isBlocked: editedRow.blockUser

            });
            setBlockConfirmation(editedRow.blockUser)
            setIsBlockDialogOpen(true);

        }


    };

    const handleCloseBlockDialog = () => {
        setIsBlockDialogOpen(false);
        setBlockConfirmation(false);
        setUserIdToBlock(null);
    };


    // const handleConfirmBlock = () => {
    //     if (blockConfirmation && userIdToBlock !== null) {
    //         // Perform your block user logic here
    //         console.log(`Blocking user with ID: ${userIdToBlock}`);
    //         setTimeout(() => {
    //             const rowIndex = rows.findIndex((row) => row.id === userIdToBlock);

    //             if (rowIndex !== -1) {
    //                 const updatedUserData = {
    //                     // id: editRowData.id,
    //                     email: formData.email,
    //                     name: formData.name,
    //                     role: formData.role,
    //                     // isBlocked: formData.isBlocked
    //                     isBlocked: blockConfirmation
    //                 };

    //                 dispatch(updateUser(userIdToBlock, updatedUserData))

    //                 toast.success('User Blocked Successfully', {
    //                     position: toast.POSITION.TOP_RIGHT,
    //                 });

    //                 // toast.success('User Blocked Successfully', {
    //                 //     position: toast.POSITION.TOP_RIGHT,
    //                 // });

    //             }
    //             // setFormData({
    //             //     email: '',
    //             //     name: '',
    //             //     role: '',
    //             //     isBlocked:
    //             // });

    //             handleCloseBlockDialog();


    //         }, 1500);
    //         // Reset the form and close the dialog

    //     }
    // };



    const handleConfirmBlock = () => {
        if (userIdToBlock !== null) {
            const updatedBlockStatus = blockConfirmation;

            const updatedUserData = {
                isBlocked: updatedBlockStatus
            };

            dispatch(updateUser(userIdToBlock, updatedUserData));

            const actionMessage = updatedBlockStatus ? "User Blocked Successfully" : "User Unblocked Successfully";
            toast.success(actionMessage, {
                position: toast.POSITION.TOP_RIGHT,
            });

            handleCloseBlockDialog();
        }
    };






    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },

        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            editable: true,
        },
        {
            // field: 'edit',
            field: "blockUser",
            // headerName: 'Edit / Block / Deactivate',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => (
                <div>
                    <IconButton
                        onClick={() => handleEdit(params.row.id)}
                        color="primary"
                        size="small"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>{
                            console.log('params row checking',params.row)
                            handleOpenBlockDialog(params.row.id)
                        } }
                        style={{
                            backgroundColor: params.row.blockUser ? 'red' : 'green',
                            // backgroundColor:editRowData.blockUser?'red':'green',
                            color: 'white',
                            marginLeft: '8px'
                        }}
                        size="small"
                    >
                        <BlockIcon />
                    </IconButton>
                    <IconButton
                        //   onClick={() => handleDeactivateUser(params.row.id)}
                        style={{ backgroundColor: 'blue', color: 'white', marginLeft: '8px' }}
                        size="small"
                    >
                        <CancelIcon />
                    </IconButton>
                </div>
            ),
        },



        // {
        //     field: 'edit',
        //     headerName: 'Edit',
        //     width: 150,
        //     renderCell: (params) => (
        //         <IconButton
        //             onClick={() => handleEdit(params.row.id)} // Replace handleEdit with your edit logic
        //             color="primary"
        //             size="small"
        //         >
        //             <EditIcon />
        //         </IconButton>
        //     ),
        // },

        // {
        //     field: 'blockUser',
        //     headerName: 'Block User',
        //     width: 150,
        //     renderCell: (params) => (
        //         <IconButton
        //             onClick={() => handleOpenBlockDialog(params.row.id)} // Replace handleBlockUser with your logic
        //             style={{ backgroundColor: 'red', color: 'white' }}
        //             size="small"
        //         >
        //             <BlockIcon />
        //         </IconButton>
        //     ),
        // },

        // {
        //     field: 'deactivate',
        //     headerName: 'Deactivate User',
        //     width: 180,
        //     renderCell: (params) => (
        //         <IconButton
        //             // onClick={() => handleDeactivateUser(params.row.id)} // Replace handleDeactivateUser with your logic
        //             style={{ backgroundColor: 'blue', color: 'white' }}
        //             size="small"
        //         >
        //             <CancelIcon />
        //         </IconButton>
        //     ),
        // },


    ];



    const rows = [];

    users && users.forEach((item) => {
        console.log('users real data', item);

        rows.push({
            id: item._id,
            email: item.email,
            name: item.name,
            role: item.role,
            blockUser: item.isBlocked

        })

    })









    return (
        <>
            <TopBar />
            <Grid container className={classes.contentContainer}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen}
                            sx={{ minWidth: 120, alignSelf: 'flex-end', marginBottom: '8px' }}
                        >
                            Add
                        </Button>
                        <Box sx={{ flexGrow: 1 }}>
                            <DataGrid

                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                // pageSizeOptions={[5]}
                                components={{ Toolbar: GridToolbar }}
                                pageSizeOptions={[5, 10, 25]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>

                        <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                            <DialogTitle>Edit Data</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please modify the form fields to update the row data.
                                </DialogContentText>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Date"
                                            variant="outlined"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            variant="outlined"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Role"
                                            variant="outlined"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            required
                                        />
                                    </Grid>


                                </Grid>


                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setIsEditModalOpen(false)} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleUpdate} color="primary" disabled={loading}>
                                    {loading ? (
                                        <CircularProgress size={20} color="inherit" />
                                    ) : (
                                        <Typography variant="button">Update</Typography>
                                    )}
                                </Button>


                            </DialogActions>
                        </Dialog>
                        <Dialog open={isBlockDialogOpen} onClose={handleCloseBlockDialog}>
                            <DialogTitle>Block User</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Do you want to block this user?
                                </DialogContentText>
                                <FormControlLabel
                                    control={<Checkbox checked={blockConfirmation} onChange={(e) => setBlockConfirmation(e.target.checked)} />}
                                    label="Yes, I want to block this user."
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!blockConfirmation}
                                            onChange={(e) => setBlockConfirmation(!e.target.checked)}
                                        />
                                    }
                                    label="Unblock User"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseBlockDialog} color="primary">
                                    Cancel
                                </Button>
                                {/* <Button onClick={handleConfirmBlock} color="primary" disabled={!blockConfirmation}>
                                    {blockConfirmation ? "Block" : "Unblock"}
                                </Button> */}
                                <Button onClick={handleConfirmBlock} color="primary" disabled={userIdToBlock === null}>
                                    {blockConfirmation ? "Block" : "Unblock"}
                                </Button>



                            </DialogActions>
                        </Dialog>

                    </Box>
                </Grid>
            </Grid>
            <ToastContainer />
        </>



    );
}