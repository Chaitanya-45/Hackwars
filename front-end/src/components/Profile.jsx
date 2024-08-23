import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Typography, Paper } from '@mui/material';
import { auth, database} from '../firebase/firebase';

const useStyles = styled((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default, 
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    maxWidth: 500,
    width: '100%', 
    textAlign: 'center', 
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = database.ref(`users/${user.uid}`);
          const snapshot = await userRef.once('value');
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setError('User data not found.');
          }
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError('User not authenticated.');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <Typography variant="body2" color="error">{error}</Typography>;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {error ? (
          <Typography variant="body2" color="error">{error}</Typography>
        ) : userData ? (
          <>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1">Username: {userData.username}</Typography>
            <Typography variant="body1">Email: {userData.email}</Typography>
            <Typography variant="body1">Phone Number: {userData.phoneNumber}</Typography>
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Paper>
    </div>
  );
};

export default Profile;
