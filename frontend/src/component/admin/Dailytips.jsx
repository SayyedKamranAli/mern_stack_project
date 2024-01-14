import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TopBar from "./TopBar";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { addDailyTips, getDailyTips,updateDailyTips } from "../../actions/dailyTipsAction";
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
} from "@mui/material";
import moment from "moment/moment";

const useStyles = makeStyles((theme) => ({
  // hello
  // hello yash
  // hello i am abhay
  // kumar

  contentContainer: {
    paddingTop: theme.spacing(8), // Add top padding to create space between TopBar and content
    backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
    color: theme.palette.mode === "dark" ? "white" : "black",
    minHeight: "100vh",
  },
}));

export default function Dailytips() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { dailytips } = useSelector((state) => state.alldailytips);
  const rows = [];
  // const [rows1, setRows] = React.useState(rows);
  React.useEffect(() => {
    dispatch(getDailyTips());

    // dispatch(updateIntrest());
  }, []);

  const [formData, setFormData] = React.useState({
    //date: '',
    title: "",
    description: "",
    // createdby: '',
    // status: '',
  });

  const [editRowData, setEditRowData] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setFormData({
      date: "",
      title: "",
      description: "",
      createdby: "",
      // status: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  dailytips &&
    dailytips?.tips?.map((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        title: item.title,
        description: item.description,
        date: moment(item?.createdAt).format("DD/MM/YYYY"),
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
    setTimeout(() => {
      setLoading(false);
      // Find the index of the edited row in the rows array
      const rowIndex = rows.findIndex((row) => row.id === editRowData.id);

      if (rowIndex !== -1) {
        // Update the row data with the form data
        const updatedRows = [...rows];
        updatedRows[rowIndex] = {
          ...editRowData,
        //  date: formData.date,
          title: formData.title,
          description: formData.description,
        //  createdby: formData.createdby,
        };
dispatch(updateDailyTips(updatedRows[rowIndex]))
        //  setRows(updatedRows);
      }
      setTimeout(() => {
        dispatch(getDailyTips());
      }, 1000);
      // Reset the form data and close the edit modal
      setFormData({
        date: "",
        title: "",
        description: "",
        createdby: "",
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
      // Simulate API call completion
      setLoading(false);
      const datatosend = {
        title: formData.title,
        description: formData.description,
      };
      // Update the table data with the new row
      dispatch(addDailyTips(datatosend));
      // setRows((prevRows) => [
      //     ...prevRows,
      //     {
      //         id: prevRows.length + 1,
      //         date: formData.date,
      //         title: formData.title,
      //         description: formData.description,
      //         createdby: formData.createdby,
      //         // status: formData.status,
      //         // age: null,
      //     },
      // ]);
      // Reset the form data and close the modal
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
      // valueFormatter: (params) =>
      //   moment(params?.row?.date).format("DD/MM/YYYY"),
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "createdby",
      headerName: "Created By",
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
    {
      field: "delete",
      headerName: "Delete",
      width: 110,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDelete(params.row.id)} // Replace handleDelete with your delete logic
          color="secondary"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
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
            <Typography variant="h2">Daily Tips</Typography>
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
              <DialogTitle>Add Data</DialogTitle>
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
                  {/* <Grid item xs={12}>
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
