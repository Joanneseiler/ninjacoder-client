import React, {useEffect, useRef} from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NotFound from "./components/NotFound";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
// import NavBar from "./components/NavBar";
import axios from 'axios';
import LandingPage from "./components/LandingPage";


function App() {
  let history = useHistory()
  const [user, setUser] = React.useState(null)
  const [signInError, setSignInError] = React.useState(null)
  const [signUpError, setSignUpError] = React.useState(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return;
    }
    history.push('/')
  }, [user, history]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const {username, role, email, password, repeatedPassword, kidAge, secretWord} = event.target
    const newUser = {
      username: username.value,
      role: role.value, 
      email: email.value, 
      password: password.value, 
      repeatedPassword: repeatedPassword.value,
      kidAge: kidAge.value,
      secretWord: secretWord.value 
    }

    try {
      const response = await axios.post(`http://localhost:5005/api/signup`, newUser, {withCredentials: true})
      setUser(response.data)
    } catch(err) {
      setSignUpError(err.response.data.error)
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const {role, email, password} = event.target
    const submittedUser = {role: role.value, email: email.value, password: password.value}
    try {
      const response = await axios.post(`http://localhost:5005/api/signin`, submittedUser, {withCredentials: true})
      setUser(response.data)
    } catch(err) {
      setSignInError(err.response.data.error)
    }
  };

  return (
    <div>
      <Switch>
      {/* <NavBar /> */}
      <Route exact path={"/"} render={() => {
      return <LandingPage/> 
      }} />
      <Route path="/signin" render={(routeProps) => {
      return <SignInForm error={signInError} onSignIn={handleSignIn} {...routeProps}  />
      }}/>
      <Route path="/signup" render={(routeProps) => {
        return <SignUpForm error={signUpError} onSignUp={handleSignUp} {...routeProps}  />
      }}/>
      <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
