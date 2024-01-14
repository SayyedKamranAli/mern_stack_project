import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TopBar from "./TopBar";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  addExercise,
  getExercise,
  updateExercise,
} from "../../actions/exercise_or_meditationAction";
import Sidebar from "./Sidebar";
import ClearIcon from "@mui/icons-material/Clear";
import BlockIcon from "@mui/icons-material/Block";
import CancelIcon from "@mui/icons-material/Cancel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  Tooltip,
} from "@mui/material";
import moment from "moment/moment";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(8), // Add top padding to create space between TopBar and content
    backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
    color: theme.palette.mode === "dark" ? "white" : "black",
    minHeight: "100vh",
  },
}));

function Exercise_or_Meditation() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userIdToBlock, setUserIdToBlock] = React.useState(null);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = React.useState(false);
  const [blockConfirmation, setBlockConfirmation] = React.useState(false);
  const dispatch = useDispatch();
  const { getexercise } = useSelector((state) => state?.allexercise);

  const rows = [];
  // const [rows1, setRows] = React.useState(rows);
  React.useEffect(() => {
    dispatch(getExercise());

    // dispatch(updateBlog())
    // dispatch(updateIntrest());
  }, []);

  const [formData, setFormData] = React.useState({
    //date: '',
    title: "",
    description: "",
    file: null,
    // createdby: '',
    // status: '',
  });

  const handleOpenBlockDialog = (id) => {
    // setUserIdToBlock(id);
    // const editedRow = rows.find((row) => row.id === id);
    // console.log("handleOpenBlockDialog", editedRow);
    // if (editedRow) {
    //   setEditRowData(editedRow);
    //   setFormData({
    //     email: editedRow.email,
    //     name: editedRow.name,
    //     role: editedRow.role,
    //     isBlocked: editedRow.blockUser,
    //   });
    //   setBlockConfirmation(editedRow.blockUser);
    //   setIsBlockDialogOpen(true);
    // }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // setFormData({ ...formData, banner: selectedFile });
    setFormData({ ...formData, file: selectedFile });
  };

  const clearFile = () => {
    setFormData({ ...formData, file: null });
  };

  const [editRowData, setEditRowData] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setFormData({
      date: "",
      title: "",
      description: "",
      createdby: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  getexercise &&
    getexercise?.allexercise?.map((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        title: item.title,
        file: item.profile,
        description: item.description,
        date: moment(item.createdAt).format("DD/MM/YYYY"),
      });
    });

  const handleEdit = (id) => {
    // Find the row with the given ID from the rows array
    const editedRow = rows.find((row) => row.id === id);

    if (editedRow) {
      // Implement your edit logic here.
      // You can open a dialog with the form fields pre-filled with the row data,
      // allowing the user to modify and update the row data.
      // After the edit is completed, you may update the rows array accordingly.
      // For this example, we'll just log the edited row.
      setEditRowData(editedRow);
      setFormData({
        date: editedRow.date,
        title: editedRow.title,
        description: editedRow.description,
        createdby: editedRow.createdby,
      });
      setIsEditModalOpen(true);
    }
  };

  const handleUpdate = () => {
    setLoading(true);

    try {
      setLoading(false);
      // Find the index of the edited row in the rows array
      const rowIndex = rows.findIndex((row) => row.id === editRowData.id);

      if (rowIndex !== -1) {
        // Update the row data with the form data
        const updatedRows = [...rows];
        updatedRows[rowIndex] = {
          ...editRowData,
          date: formData.date,
          title: formData.title,
          description: formData.description,
          createdby: formData.createdby,
        };
        dispatch(updateExercise(updatedRows[rowIndex]));

        //  setRows(updatedRows);
      }
    } catch (error) {}
    setTimeout(() => {
      dispatch(getExercise());
    }, 1000);
    // Reset the form data and close the edit modal
    setFormData({
      date: "",
      title: "",
      description: "",
      createdby: "",
    });
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    // Find the index of the row with the given ID from the rows array
    const rowIndex = rows.findIndex((row) => row.id === id);

    if (rowIndex !== -1) {
      // Implement your delete logic here.
      // You can show a confirmation dialog before deleting the row.
      // After the deletion is confirmed, remove the row from the rows array.
      // For this example, we'll just log the deleted row.
      const deletedRow = rows[rowIndex];
      console.log("Deleting Row:", deletedRow);

      // Create a new array without the deleted row
      const updatedRows = [
        ...rows.slice(0, rowIndex),
        ...rows.slice(rowIndex + 1),
      ];

      // Update the rows state with the new array
      //  setRows(updatedRows);
    }
  };

  // const [rows, setRows] = React.useState(rows);

  const handleSubmit = () => {
    // Perform your API call or data processing here
    setLoading(true);
    setTimeout(() => {
      // Simulate API call completion
      setLoading(false);
      //
      const formdata = new FormData();
      formdata.append("file", formData.file, formData.file.name);
      formdata.append("title", formData.title);
      formdata.append("description", formData.description);
      // formdata.append('status',formData.status)
      // Update the table data with the new row
      dispatch(addExercise(formData));

      // Reset the form data and close the modal
      toast.success("Submit Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        dispatch(getExercise());
      }, 1000);

      setFormData({
        date: "",
        title: "",
        description: "",
        createdby: "",
        // status: '',
      });
      setOpen(false);
    }, 1500);
  };

  const columns = [
    { field: "index", headerName: "ID", width: 90 },
    //   {
    //     field: 'firstName',
    //     headerName: 'First name',
    //     width: 150,
    //     editable: true,
    //   },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: false,
      //   valueFormatter: (params) =>
      //     moment(params?.row?.date).format("DD/MM/YYYY"),
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
    },
    {
      field: "file",
      headerName: "Image",
      width: 150,
      //editable: true,
      renderCell: (params) => (
        <img
          src={params.row.file}
          alt="img"
          style={{
            minWidth: "140px",
            maxWidth: "140px",
            minHeight: "50px",
            maxHeight: "50px",
          }}
        />
      ),
    },
    {
      field: "description",
      headerName: "Description",
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
            <Tooltip title="edit">
              <EditIcon />
            </Tooltip>
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
            <Tooltip title="block">
              <BlockIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            //   onClick={() => handleDeactivateUser(params.row.id)}
            style={{
              backgroundColor: "blue",
              color: "white",
              marginLeft: "8px",
            }}
            size="small"
          >
            <Tooltip title="deactivate">
              <CancelIcon />
            </Tooltip>
          </IconButton>
        </div>
      ),
    },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   width: 110,
    //   renderCell: (params) => (
    //     <IconButton
    //       onClick={() => handleDelete(params.row.id)} // Replace handleDelete with your delete logic
    //       color="secondary"
    //       size="small"
    //     >
    //       <DeleteIcon />
    //     </IconButton>
    //   ),
    // },
    //   {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //   },
  ];

  return (
    <>
      <TopBar />
      <Grid container className={classes.contentContainer}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} style={{ paddingLeft: "20px" }}>
          <Box
            sx={{
              height: 400,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2">Exercise Or Meditation</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{ minWidth: 120, alignSelf: "flex-end", marginBottom: "8px" }}
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
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill in the form to add data to the table.
                </DialogContentText>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Date"
                                                variant="outlined"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                required
                                            />
                                        </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      variant="outlined"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      variant="outlined"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      //label="Upload File"
                      variant="outlined"
                      type="file"
                      onChange={handleFileChange}
                      InputProps={{
                        endAdornment: (
                          <>
                            {formData.file && (
                              <IconButton onClick={clearFile}>
                                <ClearIcon />
                              </IconButton>
                            )}
                          </>
                        ),
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Created-By"
                                                variant="outlined"
                                                value={formData.createdby}
                                                onChange={(e) => setFormData({ ...formData, createdby: e.target.value })}
                                                required
                                            />
                                        </Grid> */}
                  {/* <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Status"
                                                variant="outlined"
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                required
                                            />
                                        </Grid> */}
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
                  {/* <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Date"
                        variant="outlined"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        required
                      />
                    </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      variant="outlined"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      variant="outlined"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
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
          </Box>
        </Grid>
        <ToastContainer />
      </Grid>
    </>
  );
}

export default Exercise_or_Meditation;
