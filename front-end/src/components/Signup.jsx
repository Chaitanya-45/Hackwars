import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Typography, Paper, FormControlLabel, Checkbox } from '@material-ui/core';
import { auth, database, googleProvider} from '../firebase/firebase';
import { Navigate } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(4),
    marginLeft: theme.spacing(10),
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
    marginTop: theme.spacing(2),
  },
  terms: {
    marginTop: theme.spacing(2),
  },
  successMessage: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: '#4caf50',
    color: '#fff',
    borderRadius: theme.spacing(1),
    textAlign: 'center',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSignUp = async () => {
    setError('');
    setSuccessMessage('');

    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      
      await database.ref('users/' + user.uid).set({
        username,
        phoneNumber,
        email,
      });

      setSuccessMessage('Successfully signed up!');
      setEmail('');
      setUsername('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
      setAgreeTerms(false);

      console.log('User signed up and data saved:', email, username, phoneNumber);

      
      setRedirectToLogin(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const signupWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;

      await database.ref('users/' + user.uid).set({
        username: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });

      setSuccessMessage('Successfully signed in with Google!');
      setRedirectToLogin(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          {successMessage && (
            <Typography variant="body2" className={classes.successMessage}>
              {successMessage}
            </Typography>
          )}
          <Paper className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off">
              <Typography variant="h4" align="center" gutterBottom>
                Sign Up
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
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                }
                label="I consent to the sharing of my email address."
                className={classes.terms}
                style={{ display: 'flex', alignItems: 'center' }}
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
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
              <br />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className={classes.button}
                onClick={signupWithGoogle}
              >
                Sign Up with Google
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
