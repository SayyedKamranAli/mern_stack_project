import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import TopBar from "./TopBar";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import {
  addIntrest,
  getIntrest,
  updateIntrest,
} from "../../actions/intrestAction";
import DeleteIcon from "@mui/icons-material/Delete";

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
  FormControlLabel,
  Switch,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(8), // Add top padding to create space between TopBar and content
    backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
    color: theme.palette.mode === "dark" ? "white" : "black",
    minHeight: "100vh",
  },
}));

export default function InterestPage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { error, interest } = useSelector((state) => state.interest);
  const { interests } = useSelector((state) => state.allinterest);
  const dispatch = useDispatch();
  const rows = [];
  useEffect(() => {
    dispatch(getIntrest());
    
   // dispatch(updateIntrest());
  }, []);

  const [formData, setFormData] = React.useState({
    name: "",
    status: "",
    // description: '',
    // createdby: '',
    // status: '',
  });

  const [editRowData, setEditRowData] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setFormData({
      name: "",
      status: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        name: editedRow.name,
        status: editedRow.status,
      });
      setIsEditModalOpen(true);
    }
  };

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Find the index of the edited row in the rows array
      const rowIndex = rows.findIndex((row) => row.id === editRowData.id);

      if (rowIndex !== -1) {
        // Update the row data with the form data
        const updatedRows = [...rows];
        updatedRows[rowIndex] = {
          ...editRowData,
          name: formData.name,
          status: formData.status,
        };
        dispatch(updateIntrest(updatedRows[rowIndex]));
        //setRows(updatedRows);
      }
      setTimeout(() => {
        dispatch(getIntrest());
      }, 1000);
      
      // Reset the form data and close the edit modal
      setFormData({
        name: "",
        status: "",
      });
      setIsEditModalOpen(false);
    }, 1500);
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
      dispatch(addIntrest(formData.name));
      setLoading(false);
   setTimeout(() => {
    dispatch(getIntrest());
   }, 1000);
      
      // Reset the form data and close the modal
      setFormData({
        name: "",
        status: "",

        // status: '',
      });
      setOpen(false);
    }, 1500);
  };

  const columns = [
    { field: "index", headerName: "ID", width: 150 },
    //   {
    //     field: 'firstName',
    //     headerName: 'First name',
    //     width: 150,
    //     editable: true,
    //   },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ row: { access } }) => {
        return (
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
               // checked={rows}
                onChange={(e) => console.log(e.target.value)}
                name="hello"
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
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEdit(params.row.id)} // Replace handleEdit with your edit logic
          color="primary"
          size="small"
        >
          <EditIcon />
        </IconButton>
      ),
    },
    // {
    //     field: 'delete',
    //     headerName: 'Delete',
    //     width: 110,
    //     renderCell: (params) => (
    //         <IconButton
    //             onClick={() => handleDelete(params.row.id)} // Replace handleDelete with your delete logic
    //             color="secondary"
    //             size="small"
    //         >
    //             <DeleteIcon />
    //         </IconButton>
    //     ),
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

  
  interests &&
    interests.map((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        name: item.name,
        status: item.status,
      });
    });

  return (
    <>
      <TopBar />
      <Grid container className={classes.contentContainer}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} style={{paddingLeft:"20px"}}>
          <Box
            sx={{
              height: 400,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2">Interest</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{ minWidth: 120, alignSelf: "flex-end", marginBottom: "8px" }}
            >
              Add
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              {!rows ? (
                <></>
              ) : (
                <>
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
                </>
              )}
            </Box>
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
                      label="Name"
                      variant="outlined"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="status"
                      variant="outlined"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </Grid> */}
                  {/* <Grid item xs={12}>
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
                      label="Created-By"
                      variant="outlined"
                      value={formData.createdby}
                      onChange={(e) =>
                        setFormData({ ...formData, createdby: e.target.value })
                      }
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
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
                  </Grid> */}
                  {/* <Grid item xs={12}>
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
                      label="Created-By"
                      variant="outlined"
                      value={formData.createdby}
                      onChange={(e) =>
                        setFormData({ ...formData, createdby: e.target.value })
                      }
                      required
                    />
                  </Grid> */}
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
      </Grid>
    </>
  );
}
