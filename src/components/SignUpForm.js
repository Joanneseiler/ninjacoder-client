import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
//import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
       NinjaCoder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function ParentComponents(props) {
  if (!props.isVisible) {
    return <></>
  }

  return <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="kidAge"
        label="Age of your child"
        name="kidAge"
        autoFocus
      />
        <TextField
        margin="normal"
        required
        fullWidth
        id="secretWord"
        label="Please choose a secret word"
        name="secretWord"
        autoFocus
      />
    </>
}

  function SignUpForm(props) {
    const [role, setRole] = React.useState("tutor")
  
    const handleSelect = (event) => {
      setRole(event.target.value)
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={props.onSignUp} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repeatedPassword"
            label="Repeat password"
            type="password"
            id="repeatedPassword"
            autoComplete="current-password"
          />
          <InputLabel id="role">Who are you?</InputLabel>
            <Select
            labelid= "role"
            margin="normal"
            required
            fullWidth
            id="role"
            value={role}
            onChange={handleSelect}
            // label="Who are you?"
            name="role">
            <MenuItem value="tutor">Tutor</MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
            </Select>
            <ParentComponents isVisible={role === "parent"}></ParentComponents>
          <div style={{display: "flex", justifyContent: "center", color: "red"}}>{props.error}</div>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button style={{color: "white"}} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link style={{color: '#000000', textDecoration: "none"}} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <span style={{fontSize: "0.875rem"}}>Already have an account?</span>
              <Link style={{marginLeft: 8, textDecoration: "none"}} href="/signin" variant="body2">
                Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default SignUpForm;