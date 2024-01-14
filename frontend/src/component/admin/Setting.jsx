import React, { useState } from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DataGridPro } from "@mui/x-data-grid-pro"
import TopBar from './TopBar';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Sidebar from './Sidebar';
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  TextField, Typography, Grid,
  DialogContentText, DialogTitle, CircularProgress, IconButton
} from '@mui/material';


const useStyles = makeStyles((theme) => ({

  contentContainer: {
    paddingTop: theme.spacing(8), // Add top padding to create space between TopBar and content
    backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
    minHeight: '100vh',
  },
}));






export default function InterestPage() {
  const classes = useStyles();

  return (
    <>
      <TopBar />

        <Grid item xs={2}>
          <Sidebar />
        </Grid>


      <Grid container className={classes.contentContainer}>
        <div style={{ paddingLeft: "300px", paddingTop: "20px" }}>

          <h2 style={{ fontFamily: "sans-serif", padding: '20px 0px', color: "#1976D2" }}>Settings</h2>

          <table >
            <thead >
              <tr>
                <th style={{ padding: "10px", fontFamily: "sans-serif" }}>S.NO</th>
                <th style={{ padding: "10px", fontFamily: "sans-serif" }}>Level Name</th>
                <th style={{ padding: "10px", fontFamily: "sans-serif" }}>Questions</th>
                <th style={{ padding: "10px", fontFamily: "sans-serif" }}>Coins</th>


              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px" }}>1.</td>
                <td style={{ padding: "10px" , fontFamily: "sans-serif" }}>Gold</td>
                <td style={{ padding: "10px" }}><input style={{ padding: "8px 50px", borderRadius: "4px" }} type='text' /></td>
                <td style={{ padding: "10px" }}>20</td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>2.</td>
                <td style={{ padding: "10px" , fontFamily: "sans-serif" }}>Silver</td>
                <td style={{ padding: "10px" }}><input style={{ padding: "8px 50px", borderRadius: "4px" }} type='text' /></td>
                <td style={{ padding: "10px" }}>40</td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>3.</td>
                <td style={{ padding: "10px" , fontFamily: "sans-serif" }}>Gold</td>
                <td style={{ padding: "10px" }}><input style={{ padding: "8px 50px", borderRadius: "4px" }} type='text' /></td>
                <td style={{ padding: "10px" }}>60</td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>4.</td>
                <td style={{ padding: "10px" , fontFamily: "sans-serif" }}>Bronze</td>
                <td style={{ padding: "10px" }}><input style={{ padding: "8px 50px", borderRadius: "4px" }} type='text' /></td>
                <td style={{ padding: "10px" }}>80</td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>5.</td>
                <td style={{ padding: "10px" , fontFamily: "sans-serif" }}>Silver</td>
                <td style={{ padding: "10px" }}><input style={{ padding: "8px 50px", borderRadius: "4px" }} type='text' /></td>
                <td style={{ padding: "10px" }}>100</td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>6.</td>
                <td style={{ padding: "10px" , fontFamily: "sans-serif" }}>Gold</td>
                <td style={{ padding: "10px" }}><input style={{ padding: "8px 50px", borderRadius: "4px" }} type='text' /></td>
                <td style={{ padding: "10px" }}>120</td>
              </tr>


            </tbody>
          </table>
          <button style={{ background: "#1976D2", border: "none", color: "white", padding: "15px 50px", borderRadius: "4px", fontSize: "14px", position: "relative", left: "220px", top: "40px" }}>Save</button>
        </div>




      </Grid>
    </>



  );
}