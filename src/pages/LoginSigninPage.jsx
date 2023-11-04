import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const LoginSignupPage = () => {

    const navigate = useNavigate();


  const [value, setValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = async () => {
    // Prepare the data for login
    const data = { email, password };

    try {
      const response = await axios.post('https://sticky-notes.cyclic.app/auth/login', data);
      console.log('Login successful', response.data);

      const userData = {
        username: response.data.username,
        number: response.data.number,
        email: response.data.email,
        accessToken: response.data.accessToken,
        _id : response.data._id
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      alert('user loggedin successfully');
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async () => {
    // Prepare the data for signup
    const data = { username, email, number, password };

    try {
      const response = await axios.post('https://sticky-notes.cyclic.app/auth/register', data);
      console.log('Signup successful', response.data);
      alert('user created successfully');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  return (

   


    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container maxWidth="sm">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Login and Signup</Typography>
            <div style={{ flexGrow: 1 }} />
            <IconButton color="inherit" onClick={handleThemeToggle}>
              <Brightness4Icon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Paper elevation={3} style={{ marginTop: '2rem' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
          <div style={{ padding: '24px' }}>
            {value === 0 && (
              <form>
                <Typography variant="h5" gutterBottom>
                  Login
                </Typography>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField
                  label="Password"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </form>
            )}
            {value === 1 && (
              <form>
                <Typography variant="h5" gutterBottom>
                  Signup
                </Typography>
                <TextField
                  label="Username"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField
                  label="Number"
                  fullWidth
                  margin="normal"
                  value={number}
                  onChange={handleNumberChange}
                />
                <TextField
                  label="Password"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </form>
            )}
          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginSignupPage;
