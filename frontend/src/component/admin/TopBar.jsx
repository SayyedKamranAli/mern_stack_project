import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, TextField } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeToggle from './DarkModeToggle';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logout } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopBar = () => {

  const dispatch = useDispatch();
  const { successMessage } = useSelector((state) => state.user)
  console.log('checking logout message', successMessage)
  



  const handleLogout = () => {
    dispatch(logout())
    toast.success("logout success", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose:1000,
      onOpen: () => {
        console.log('Toast opened with message:', successMessage);
      },
    });
    // Implement your logout logic here
    // For example, clear session/local storage, redirect, etc.
    console.log('Logged out');
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, marginLeft: '240px' }}>
            Admin Panel

          </Typography>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DarkModeToggle />
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon /> {/* Add SettingsIcon here */}
            </IconButton>
            <IconButton color="inherit">
              <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
        <ToastContainer />
      </AppBar>
     
    </>
  );
};

export default TopBar;
