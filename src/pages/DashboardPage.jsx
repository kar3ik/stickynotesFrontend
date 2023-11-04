import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { List } from '@mui/material';

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

const DashboardPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
  const [attachment, setAttachment] = useState('');
  const [notes, setNotes] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [updatedColor, setupdatedColor] = useState('');
  const [updatedAttachment, setupdatedAttachment] = useState('');
  const [archivedNotes, setArchivedNotes] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    // Clear the localStorage and navigate to the login/signup page
    localStorage.clear();
    navigate('/');
  };

  const userDetails = JSON.parse(localStorage.getItem('userData'));
  const userId = userDetails ? userDetails._id : null; // Extract userId
  const userAccessToken = userDetails ? userDetails.accessToken : null; // Extract accessToken

  const handleCreateNote = async () => {
    // Create a new note
    const data = { title, content, color, attachment };

    // Prepare the request configuration
    const config = {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    };

    try {
      const response = await axios.post(`https://sticky-notes.cyclic.app/notes/create/${userId}`, data, config);
      console.log('Note created successfully', response.data);
      alert('Note created successfully');
      // Fetch user notes again after creating a new note
      fetchUserNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Function to fetch the user's notes
  const fetchUserNotes = async () => {
    if (userId && userAccessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      };

      try {
        const response = await axios.get(`https://sticky-notes.cyclic.app/notes/read/${userId}`, config);
        console.log('Note fetched successfully', response.data);
        const fetchedNotes = response.data; // Store the fetched notes in a variable
        setNotes(fetchedNotes); // Set the fetched notes in state
        alert('Note fetched successfully');
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }
  };

  const handleUpdate = (note) => {
    // Show the update form and set the selected note for update
    setIsUpdateFormVisible(true);
    setSelectedNote(note);
    setUpdatedTitle(note.title);
    setUpdatedContent(note.content);
  };

  const handleUpdateNote = async (note) => {
    // Update the selected note
    const updateddata = { title: updatedTitle, content: updatedContent, color : updatedColor , attachment : updatedAttachment };

    // Prepare the request configuration
    const config = {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    };

    try {
      
      const response = await axios.put(`https://sticky-notes.cyclic.app/notes/update/${userId}/${note._id}`, updateddata, config);
   
      console.log('Note updated successfully', response.data);
      alert('Note updated successfully');
      // Hide the update form
      setIsUpdateFormVisible(false);
      // Fetch user notes again after updating a note
      fetchUserNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const fetchArchivedNotes = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    };

    try {
      const response = await axios.get(`https://sticky-notes.cyclic.app/notes/archived/${userId}`, config);
      console.log('Archived Notes fetched successfully', response.data);
      setArchivedNotes(response.data);
      alert('Archived Notes fetched successfully');
    } catch (error) {
      console.error('Error fetching archived notes:', error);
    }
  };



  const handleArchive = async (note) => {
    const noteId = note._id;

    const config = {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    };

    try {
      const response = await axios.put(`https://sticky-notes.cyclic.app/notes/archive/${userId}/${noteId}`, {}, config);
      console.log('Note archived successfully', response.data);
      alert('Note archived successfully');

      // Optionally, update the list of notes to remove the archived note from the UI.
      const updatedNotes = notes.filter((n) => n._id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  };


  const handleUnarchiveNote = async (note) => {
    const noteId = note._id;

    const config = {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    };

    try {
      const response = await axios.put(`https://sticky-notes.cyclic.app/notes/unarchive/${userId}/${noteId}`, {}, config);
      console.log('Note unarchived successfully', response.data);
      alert('Note unarchived successfully');
      
      // Remove the unarchived note from the archived notes list
      const updatedArchivedNotes = archivedNotes.filter((n) => n._id !== noteId);
      setArchivedNotes(updatedArchivedNotes);

      // Optionally, update the list of notes to include the unarchived note
      setNotes([...notes, note]);
    } catch (error) {
      console.error('Error unarchiving note:', error);
    }
  };

  const handleDelete = async (note) => {
    const noteId = note._id;


    const config = {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    };

    try {
      const response = await axios.delete(`https://sticky-notes.cyclic.app/notes/delete/${userId}/${noteId}`, config);
      console.log('Note deleted successfully', response.data);
      alert('Note deleted successfully');

      // Optionally, update the list of notes to remove the deleted note from the UI.
      const updatedNotes = notes.filter((n) => n._id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated
    const userDetails = JSON.parse(localStorage.getItem('userData'));
    if (!userDetails || !userDetails.accessToken) {
      // No user or token found in localStorage, navigate to login/signup page
      navigate('/');
    } else {
      // Fetch user's notes when the Dashboard loads
      fetchUserNotes();
    }
  }, [navigate, userAccessToken]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">StickyNotes</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleThemeToggle}>
            <Brightness4Icon />
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ marginTop: '2rem' }}>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Notes" />
            <Tab label="Create Note" />
          </Tabs>
          <div style={{ padding: '24px' }}>
          {value === 0 && (
  <div>
    <h2>Your Notes</h2>
    <List>
      {notes.map((note) => (
        <div key={note._id}>
          <NoteCard
            note={note}
            onUpdate={handleUpdate}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />
          {isUpdateFormVisible && selectedNote?._id === note._id && (
            <div>
              <form>
                <TextField
                  label="Updated Title"
                  fullWidth
                  margin="normal"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <TextField
                  label="Updated Content"
                  fullWidth
                  margin="normal"
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                />
                 <TextField
                  label="Updated color"
                  fullWidth
                  margin="normal"
                  value={updatedColor}
                  onChange={(e) => setupdatedColor(e.target.value)}
                />
                 <TextField
                  label="Updated Attachment"
                  fullWidth
                  margin="normal"
                  value={updatedAttachment}
                  onChange={(e) => setupdatedAttachment(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateNote(note)}
                >
                  Submit Updated Note
                </Button>
              </form>
            </div>
          )}
        </div>
      ))}
    </List>
    <Button variant="contained" color="primary" onClick={fetchUserNotes}>
      Fetch Your Notes
    </Button>
  </div>
)}

            {value === 1 && (
              <form>
                <Typography variant="h5" gutterBottom>
                  Create Note
                </Typography>
                <TextField label="Title" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField
                  label="Content"
                  fullWidth
                  margin="normal"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <TextField label="Color" fullWidth margin="normal" value={color} onChange={(e) => setColor(e.target.value)} />
                <TextField
                  label="Attachment"
                  fullWidth
                  margin="normal"
                  value={attachment}
                  onChange={(e) => setAttachment(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleCreateNote}>
                  Create Note
                </Button>
              </form>
            )}
          </div>
        </Paper>
      </Container>

      <Button
        variant="contained"
        color="primary"
        onClick={fetchArchivedNotes}
      >
        Fetch Archived Notes
      </Button> 

      <List>
        {archivedNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onUpdate={handleUpdateNote}
            onUnarchive={handleUnarchiveNote} // Pass the unarchive function here
            onDelete={handleDelete}
          />
        ))}
      </List>


    </ThemeProvider>
  );
};

export default DashboardPage;
