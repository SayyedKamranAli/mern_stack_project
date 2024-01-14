import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ThemeContext from './ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
      <IconButton color="inherit" onClick={handleDarkModeToggle}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
