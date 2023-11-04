import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const NoteCard = ({ note, onUpdate, onArchive, onDelete, onUnarchive }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {note.title}
        </Typography>
        <Typography color="textSecondary">{note.color}</Typography>
        <Typography variant="body2" component="p">
          {note.content}
        </Typography>
        <List>
          {note.attachment &&
            note.attachment.map((attachment, index) => (
              <ListItem key={index}>
                <ListItemText>
                  <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                    Attachment {index + 1}
                  </a>
                </ListItemText>
              </ListItem>
            ))}
        </List>
        <Button variant="contained" color="primary" onClick={() => onUpdate(note)}>
          Update
        </Button>
        {note.archived ? (
          <Button variant="contained" color="secondary" onClick={() => onUnarchive(note)}>
            Unarchive
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={() => onArchive(note)}>
            Archive
          </Button>
        )}
        <Button variant="contained" color="error" onClick={() => onDelete(note)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
