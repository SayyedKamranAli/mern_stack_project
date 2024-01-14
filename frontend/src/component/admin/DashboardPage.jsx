import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  contentContainer: {
    paddingTop: theme.spacing(8), // Add top padding to create space between TopBar and content
  },
}));

const DashboardPage = () => {
  const classes = useStyles();

  return (
    <>
      <TopBar />
      <Grid container className={classes.contentContainer}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h4">Welcome to the Dashboard</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5">Recent Activity</Typography>
                {/* Add content for recent activity */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5">Statistics</Typography>
                {/* Add content for statistics */}
              </Paper>
            </Grid>
            {/* Add more grid items for additional sections */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
