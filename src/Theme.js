import { createTheme } from '@mui/material/styles';

export const getTheme = (darkMode) => {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });
};
