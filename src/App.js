import React, { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme } from './Theme';
import LoginSignupPage from './pages/LoginSigninPage';
import DashboardPage from './pages/DashboardPage';
import { Route, Routes} from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = getTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
   
        <Routes>
          <Route path="/" element={<LoginSignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> 
        </Routes>
      
    </ThemeProvider>
  );
}

export default App;
