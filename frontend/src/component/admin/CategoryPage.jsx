import React, { useEffect, useState } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import TopBar from "./TopBar";
import { makeStyles } from "@mui/styles";
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
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { createCategory, getAllCategory } from "../../actions/categoryAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(8), // Add top padding to create space between TopBar and content
    backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
    color: theme.palette.mode === "dark" ? "white" : "black",
    minHeight: "100vh",
  },
}));

export default function CategoryPage() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.allcategory);

  console.log("categories checking for image", categories);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    // banner: '',
    file: null,
    description: "",
    sequence: "",
    status: "",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("selected file", selectedFile);
    // setFormData({ ...formData, banner: selectedFile });
    setFormData({ ...formData, file: selectedFile });
  };

  const clearFile = () => {
    setFormData({ ...formData, file: null });
  };

  // const statusOptions = ['active', 'inactive', 'pending'];
  const [statusOptions, setstatusOptions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/V1/getcategoryenumValues"); // Replace with your API endpoint
      console.log("response enum", response);
      setstatusOptions(response.data.statusEnumValues);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetch function when the component mounts
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    const editedRow = rows.find((row) => row.id === id);
    console.log("editedRow", editedRow);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [open]);

  const handleSubmit = () => {
    // Perform your API call or data processing here
    setLoading(true);
    setTimeout(() => {
      // Simulate API call completion
      setLoading(false);
      const formdata = new FormData();
      console.log("formdata file", formData.file);
      console.log("formdata file name", formData.file.name);
      formdata.append("file", formData.file, formData.file.name);
      formdata.append("name", formData.name);
      formdata.append("description", formData.description);
      formdata.append("status", formData.status);

      // const datatocreatecategory = {
      //     name: formData.name,
      //     description: formData.description,
      //     status: formData.status
      // }
      // dispatch(createCategory(datatocreatecategory))
      dispatch(createCategory(formdata));
      setFormData({
        name: "",
        file: "",
        description: "",
        sequence: "",
        status: "",
      });
      setOpen(false);
    }, 1500);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
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
      field: "file",
      headerName: "Banner",
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
      field: "icon",
      headerName: "Icon",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Action",
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

  const rows = [];

  categories &&
    categories.forEach((item) => {
      console.log("users real data", item);

      rows.push({
        id: item._id,
        name: item.name,
        // file: item?.file,
        file: item?.profile,
        description: item.description,
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
        <Grid item xs={10} style={{ paddingLeft: "20px" }}>
          <Box
            sx={{
              height: 400,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2">Category</Typography>
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
                                            label="Banner"
                                            variant="outlined"
                                            value={formData.banner}
                                            onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                                            required
                                        />
                                    </Grid> */}
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
                                            label="Sequence"
                                            variant="outlined"
                                            value={formData.sequence}
                                            onChange={(e) => setFormData({ ...formData, sequence: e.target.value })}
                                            required
                                        />
                                    </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Status"
                      variant="outlined"
                      select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      required
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <TextField
                                            fullWidth
                                            label="Upload File"
                                            variant="outlined"
                                            type="file" // This is for uploading files
                                            onChange={handleFileChange}
                                        /> */}
                    <TextField
                      fullWidth
                      label="Upload File"
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
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
