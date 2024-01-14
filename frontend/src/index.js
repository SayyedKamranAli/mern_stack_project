import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import store from './store';
import { Provider } from "react-redux"
import { ProSidebarProvider } from 'react-pro-sidebar';
// require('dotenv').config()
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Customize the primary color
    },
    secondary: {
      main: '#f50057', // Customize the secondary color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Customize the font family
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <ThemeProvider theme={theme}>
      <ProSidebarProvider>
        <App />
        </ProSidebarProvider>
      </ThemeProvider>
    </Provider>


  </React.StrictMode>
);


