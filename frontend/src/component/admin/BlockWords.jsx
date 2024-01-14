
import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TopBar from "./TopBar";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import Sidebar from "./Sidebar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Grid,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  IconButton,
  Checkbox,
  FormControlLabel,
  Switch,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, updateUser } from "../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment";
// import { useSelector, useDispatch } from "react-redux";
import {
  createBlockWords,
  getAllBlockWords,
  updateBlockWords,
} from "../../actions/blockwordsAction";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(8),
    backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
    color: theme.palette.mode === "dark" ? "white" : "black",
    minHeight: "100vh",
  },
}));

export default function BlockKeywords() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const { isUpdated, message } = useSelector((state) => state.profile);

  const { blockwords } = useSelector((state) => state.allblockwords);
  console.log("blockwords", blockwords.getallblockwords);
  const [statusOptions, setstatusOptions] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [isBlockDialogOpen, setIsBlockDialogOpen] = React.useState(false);
  const [blockConfirmation, setBlockConfirmation] = React.useState(false);

  const [userIdToBlock, setUserIdToBlock] = React.useState(null);

  const [formData, setformData] = React.useState({
    words: "",
    status: "",
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

  function getData(e) {
    var name = e.target.name;
    var value = e.target.value;
    setformData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const formdata = new FormData();
      formdata.append("words", formData.words);
      // formdata.append('status',formData.status)
      setLoading(false);

      dispatch(createBlockWords(formdata));
 
      toast.success("Submit Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        dispatch(getAllBlockWords())
      }, 1000);
      // Reset the form data and close the modal
      setformData({
        name: "",
        status: "",
        

        // status: '',
      });
      setOpen(false);
    }, 1500);
  }

  const handleEdit = (id) => {
    console.log("id checking", id);
    setUserIdToBlock(id);
    // Find the row with the given ID from the rows array
    const editedRow = rows.find((row) => row.id === id);
    console.log("row data", editedRow);

    if (editedRow) {
      setEditRowData(editedRow);

      setformData({
        words: editedRow.words,
        status: editedRow.status,
        isBlocked: editedRow.blockUser
        // isBlocked: editedRow.blockUser,
      });

      // if(editedRow.blockUser){

      // }

      setIsEditModalOpen(true);
      console.log("Editing Row:", editedRow);
    }
  };

  useEffect(() => {
    dispatch(getAllBlockWords());
  }, []);

  function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const rowIndex = rows.findIndex((row) => row.id === editRowData.id);

      if (rowIndex !== -1) {
        // Update the row data with the form data
        const updatedRows = [...rows];
        updatedRows[rowIndex] = {
          ...editRowData,

          words: formData.words,
          status: formData.status,
        };

        setLoading(false);

        dispatch(updateBlockWords(updatedRows[rowIndex]));
        toast.success("Update Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setTimeout(() => {
        dispatch(getAllBlockWords())
      }, 1000);
      // handleCloseBlockDialog();
      setIsEditModalOpen(false)

      setformData({
        words: "",
        status: "",
      });
      setOpen(false);
    }, 1500);
  }

  const handleOpenBlockDialog = (id) => {
    setUserIdToBlock(id);
    const editedRow = rows.find((row) => row.id === id);

    console.log("handleOpenBlockDialog", editedRow);

    if (editedRow) {
      setEditRowData(editedRow);

      setBlockConfirmation(editedRow.blockUser);
      setIsBlockDialogOpen(true);
    }
  };

  const handleCloseBlockDialog = () => {
    setIsBlockDialogOpen(false);
    setBlockConfirmation(false);
    setUserIdToBlock(null);
  };

  const handleConfirmBlock = () => {
    if (userIdToBlock !== null) {
      const updatedBlockStatus = blockConfirmation;

      const updatedUserData = {
        isBlocked: updatedBlockStatus,
      };

      dispatch(updateUser(userIdToBlock, updatedUserData));

      const actionMessage = updatedBlockStatus
        ? "User Blocked Successfully"
        : "User Unblocked Successfully";
      toast.success(actionMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });

      handleCloseBlockDialog();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },

    {
      field: "words",
      headerName: "Words",
      width: 250,
      editable: true,
    },

    {
      field: "status",
      headerName: "Status",
      renderCell: ({ row: { id, blockUser } }) => {
        return (
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                checked={blockUser}
                onChange={() => handleToggleStatus(id, !blockUser)}
                name={`status-${id}`}
                color="info"
              />
            }
          />
        );
      },
      width: 150,
      editable: true,
    },

    {
      field: "edit",
      // headerName: 'Edit / Block / Deactivate',
      headerName: "Actions",
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
            onClick={() => handleOpenBlockDialog(params.row.id)}
            style={{
              backgroundColor: "red",
              color: "white",
              marginLeft: "8px",
            }}
            size="small"
          >
            <BlockIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = [];

  blockwords &&
    blockwords?.getallblockwords?.map((item) => {
      console.log("Type of blockwords:", blockwords);
      console.log("blockwords:", blockwords);
      rows.push({
        id: item._id,
        words: item.words,
        status: item.status,
      });
    });

  const handleToggleStatus = (id, newStatus) => {
    // Update the UI immediately
    const updatedUsers = users.map((user) =>
      user._id === id ? { ...user, isBlocked: newStatus } : user
    );

    // Dispatch action to update user status in Redux store
    dispatch(updateUser(id, { isBlocked: newStatus }));

    // Show a toast message based on the new status
    const actionMessage = newStatus
      ? "User Blocked Successfully"
      : "User Unblocked Successfully";
    toast.success(actionMessage, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <TopBar />
      <Grid container className={classes.contentContainer}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} style={{paddingLeft:"15px"}}>
          <Box
            sx={{
              height: 400,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              style={{ marginLeft: "11px", marginTop: "10px" }}
            >
              Block Words
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{ minWidth: 120, alignSelf: "flex-end", marginBottom: "8px" }}
            >
              Add
            </Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Data</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill in the form to add data to the table.
                </DialogContentText>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Words"
                      variant="outlined"
                      name="words"
                      value={formData.words}
                      onChange={getData}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Status"
                      variant="outlined"
                      select
                      name="status"
                      value={formData.status}
                      onChange={getData}
                      required
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Typography variant="button">Submit</Typography>
                  )}
                </Button>
              </DialogActions>
            </Dialog>

            <Box sx={{ flexGrow: 1, marginRight:"-5px" }}>
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

            <Dialog
              open={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            >
              <DialogTitle>Edit Data</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please modify the form fields to update the row data.
                </DialogContentText>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Words"
                      variant="outlined"
                      name="words"
                      value={formData.words}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, words: e.target.value })
                      // }
                      onChange={getData}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Status"
                      variant="outlined"
                      select
                      name="status"
                      value={formData.status}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, status: e.target.value })
                      // }
                      onChange={getData}
                      required
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setIsEditModalOpen(false)}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  color="primary"
                  disabled={loading}
                >
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
                  control={
                    <Checkbox
                      checked={blockConfirmation}
                      onChange={(e) => setBlockConfirmation(e.target.checked)}
                    />
                  }
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
               <Button onClick={handleConfirmBlock} color="primary" disabled={!blockConfirmation}>
                                    {blockConfirmation ? "Block" : "Unblock"}
                                </Button> 
                <Button
                  onClick={handleConfirmBlock}
                  color="primary"
                  disabled={userIdToBlock === null}
                >
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







//  without block 


// import React, { useState, useEffect } from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import TopBar from "./TopBar";
// import { makeStyles } from "@mui/styles";
// import EditIcon from "@mui/icons-material/Edit";
// import BlockIcon from "@mui/icons-material/Block";
// import Sidebar from "./Sidebar";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   TextField,
//   Typography,
//   Grid,
//   DialogContentText,
//   DialogTitle,
//   CircularProgress,
//   IconButton,
//   Checkbox,
//   FormControlLabel,
//   Switch,
//   MenuItem,
// } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // import { useSelector, useDispatch } from "react-redux";
// import {
//   createBlockWords,
//   getAllBlockWords,
//   updateBlockWords,
// } from "../../actions/blockwordsAction";

// const useStyles = makeStyles((theme) => ({
//   contentContainer: {
//     paddingTop: theme.spacing(8),
//     backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
//     color: theme.palette.mode === "dark" ? "white" : "black",
//     minHeight: "100vh",
//   },
// }));

// export default function BlockKeywords() {
//   const dispatch = useDispatch();

//   const { blockwords } = useSelector((state) => state.allblockwords);
//   console.log("blockwords", blockwords.getallblockwords);
//   const [statusOptions, setstatusOptions] = useState([]);

//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const [isBlockDialogOpen, setIsBlockDialogOpen] = React.useState(false);
//   const [blockConfirmation, setBlockConfirmation] = React.useState(false);

//   const [userIdToBlock, setUserIdToBlock] = React.useState(null);

//   const [formData, setformData] = React.useState({
//     words: "",
//     status: "",

//   });

//   const [editRowData, setEditRowData] = React.useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   function getData(e) {
//     var name = e.target.name;
//     var value = e.target.value;
//     setformData((old) => {
//       return {
//         ...old,
//         [name]: value,
//       };
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       const formdata = new FormData();
//       formdata.append("words", formData.words);
//       // formdata.append('status',formData.status)
//       setLoading(false);

//       dispatch(createBlockWords(formdata));
 
//       toast.success("Submit Successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//       setTimeout(() => {
//         dispatch(getAllBlockWords())
//       }, 1000);
//       // Reset the form data and close the modal
//       setformData({
//         name: "",
//         status: "",
        

//         // status: '',
//       });
//       setOpen(false);
//     }, 1500);
//   }

//   const handleEdit = (id) => {
//     console.log("id checking", id);
//     setUserIdToBlock(id);
//     // Find the row with the given ID from the rows array
//     const editedRow = rows.find((row) => row.id === id);
//     console.log("row data", editedRow);

//     if (editedRow) {
//       setEditRowData(editedRow);

//       setformData({
//         words: editedRow.words,
//         status: editedRow.status,

//       });

  

//       setIsEditModalOpen(true);
//       console.log("Editing Row:", editedRow);
//     }
//   };

//   useEffect(() => {
//     dispatch(getAllBlockWords());
//   }, []);

//   function handleUpdate(e) {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       const rowIndex = rows.findIndex((row) => row.id === editRowData.id);

//       if (rowIndex !== -1) {
//         // Update the row data with the form data
//         const updatedRows = [...rows];
//         updatedRows[rowIndex] = {
//           ...editRowData,

//           words: formData.words,
//           status: formData.status,
//         };

//         setLoading(false);

//         dispatch(updateBlockWords(updatedRows[rowIndex]));
//         toast.success("Update Successfully", {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }
//       setTimeout(() => {
//         dispatch(getAllBlockWords())
//       }, 1000);
//       // handleCloseBlockDialog();
//       setIsEditModalOpen(false)

//       setformData({
//         words: "",
//         status: "",
//       });
//       setOpen(false);
//     }, 1500);
//   }

 


  

//   const columns = [
//     { field: "id", headerName: "ID", width: 150 },

//     {
//       field: "words",
//       headerName: "Words",
//       width: 250,
//       editable: true,
//     },

//     {
//       field: "status",
//       headerName: "Status",
//       renderCell: ({ row: { id, blockUser } }) => {
//         return (
//           <FormControlLabel
//             sx={{
//               display: "block",
//             }}
//             control={
//               <Switch
//                 checked={statusOptions}
//                 onChange={() => handleToggleStatus(id, statusOptions)}
//                 name={`status-${id}`}
//                 color="info"
//               />
//             }
//           />
//         );
//       },
//       width: 150,
//       editable: true,
//     },



//     {
//       field: "edit",
//       // headerName: 'Edit / Block / Deactivate',
//       headerName: "Actions",
//       width: 300,
//       renderCell: (params) => (
//         <div>
//           <IconButton
//             onClick={() => handleEdit(params.row.id)}
//             color="primary"
//             size="small"
//           >
//             <EditIcon />
//           </IconButton>
          
//         </div>
//       ),
//     },
//   ];

//   const rows = [];

//   blockwords &&
//     blockwords?.getallblockwords?.map((item) => {
//       console.log("Type of blockwords:", blockwords);
//       console.log("blockwords:", blockwords);
//       rows.push({
//         id: item._id,
//         words: item.words,
//         status: item.status,
//       });
//     });

//   const handleToggleStatus = () => {
   
//   };

//   return (
//     <>
//       <TopBar />
//       <Grid container className={classes.contentContainer}>
//         <Grid item xs={2}>
//           <Sidebar />
//         </Grid>
//         <Grid item xs={10} style={{paddingLeft:"15px"}}>
//           <Box
//             sx={{
//               height: 400,
//               width: "100%",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Typography
//               variant="h3"
//               style={{ marginLeft: "11px", marginTop: "10px" }}
//             >
//               Block Words
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleClickOpen}
//               sx={{ minWidth: 120, alignSelf: "flex-end", marginBottom: "8px" }}
//             >
//               Add
//             </Button>

//             <Dialog open={open} onClose={handleClose}>
//               <DialogTitle>Add Data</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>
//                   Please fill in the form to add data to the table.
//                 </DialogContentText>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Words"
//                       variant="outlined"
//                       name="words"
//                       value={formData.words}
//                       onChange={getData}
//                       required
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Status"
//                       variant="outlined"
//                       select
//                       name="status"
//                       value={formData.status}
//                       onChange={getData}
//                       required
//                     >
//                       {statusOptions.map((option) => (
//                         <MenuItem key={option} value={option}>
//                           {option.charAt(0).toUpperCase() + option.slice(1)}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12}></Grid>
//                 </Grid>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose} color="primary">
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleSubmit}
//                   color="primary"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     <Typography variant="button">Submit</Typography>
//                   )}
//                 </Button>
//               </DialogActions>
//             </Dialog>

//             <Box sx={{ flexGrow: 1, marginRight:"-5px" }}>
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 initialState={{
//                   pagination: {
//                     paginationModel: {
//                       pageSize: 5,
//                     },
//                   },
//                 }}
//                 // pageSizeOptions={[5]}
//                 components={{ Toolbar: GridToolbar }}
//                 pageSizeOptions={[5, 10, 25]}
//                 checkboxSelection
//                 disableRowSelectionOnClick
//               />
//             </Box>

//             <Dialog
//               open={isEditModalOpen}
//               onClose={() => setIsEditModalOpen(false)}
//             >
//               <DialogTitle>Edit Data</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>
//                   Please modify the form fields to update the row data.
//                 </DialogContentText>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Words"
//                       variant="outlined"
//                       name="words"
//                       value={formData.words}
                     
//                       onChange={getData}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Status"
//                       variant="outlined"
//                       select
//                       name="status"
//                       value={formData.status}
                     
//                       onChange={getData}
//                       required
//                     >
//                       {statusOptions.map((option) => (
//                         <MenuItem key={option} value={option}>
//                           {option.charAt(0).toUpperCase() + option.slice(1)}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                 </Grid>
//               </DialogContent>
//               <DialogActions>
//                 <Button
//                   onClick={() => setIsEditModalOpen(false)}
//                   color="primary"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleUpdate}
//                   color="primary"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     <Typography variant="button">Update</Typography>
//                   )}
//                 </Button>
//               </DialogActions>
//             </Dialog>
     
//           </Box>
//         </Grid>
//       </Grid>
//       <ToastContainer />
//     </>
//   );
// }