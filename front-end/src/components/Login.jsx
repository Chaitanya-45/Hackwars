import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core';
import { auth,googleProvider } from '../firebase/firebase';
import { Navigate } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    color: 'white',
  },
  paper: {
    padding: theme.spacing(4),
    marginLeft: theme.spacing(20),
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(10),
    marginTop: theme.spacing(10),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    maxWidth: 500,
  },
  form: {
    width: '100%',
  },
  button: {
    color: 'white',
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(2),
    color: 'white',
    backgroundColor: '#4285F4', // Google blue color
    '&:hover': {
      backgroundColor: '#357AE8',
    },
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(7),
    borderRadius: theme.spacing(1),
    position: 'relative',
    overflow: 'hidden',
  },
  googleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    paddingLeft: theme.spacing(0),
  },
  googleIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 'auto',
    padding: theme.spacing(0.5), 
    objectFit: 'contain',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginClick = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('User logged in:', email);
      setIsLoggedIn(true); 
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/aftrbody" />;
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off">
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                onClick={handleLoginClick} 
              >
                Login
              </Button>
              <Button
                variant="contained"
                className={classes.googleButton}
                fullWidth
                onClick={handleGoogleLogin}
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                  className={classes.googleIcon}
                />
                <Typography className={classes.googleButtonText}>
                  Sign in with Google
                </Typography>
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;