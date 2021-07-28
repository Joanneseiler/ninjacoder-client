import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {Link} from "react-router-dom";
import FormError from './FormError';
import SignInLogo from "../Login-logo.png"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  }
}));

function SignInForm(props) {
  const [role, setRole] = useState(props.match.params.role ?? "")
  const classes = useStyles();
  const handleSelect = (event) => {
    setRole(event.target.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
       <img style={{width: '40px', margin: "15px"}} src={SignInLogo} alt="Sign in Logo"/> 
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={props.onSignIn} noValidate>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="role-label">What is your role?</InputLabel>
            <Select
              labelid= "role-label"
              required
              id="role"
              value={role}
              onChange={handleSelect}
              name="role"
            >
            <MenuItem value="tutor">Tutor</MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
          </Select>
          </FormControl>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.textField}
          />
          <FormError text={props.error}></FormError>
          <Button
            style={{color: "white"}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
            <span style={{fontSize: "0.875rem"}}>Don't have an account?</span>
            <Link style={{marginLeft: 8, textDecoration: "none"}} to="/signup" variant="body2">
                 Sign Up
            </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignInForm;