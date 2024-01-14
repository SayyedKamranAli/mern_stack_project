import React, { createContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)', // Customize border for header and cells
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white', // Set text color for header
              fontWeight: 'bold', // Customize font weight for header
            },
            '& .MuiDataGrid-cell': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white', // Set text color for cells
              // Fix cell text visibility issue in dark mode
              '& .MuiDataGrid-cellValue': {
                color: 'inherit',
              },
            },
            '& .Mui-selected': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)', // Set background color for selected rows
            },
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            color: 'white', // Set text color for pagination in dark mode
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Set background color for pagination in dark mode
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
