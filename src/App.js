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
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return;
    }
    history.push('/')
  }, [user, history]);
  
  const handleSignIn = async (event) => {
    event.preventDefault();
    const {role, email, password} = event.target
    const submittedUser = {role: role.value, email: email.value, password: password.value}
    try {
      const response = await axios.post(`http://localhost:5005/api/signin`, submittedUser)
      setUser(response.data)
    } catch(err) {
      console.log(err)
    }
  };


  return (
    <div>
    <Switch>
    {/* <NavBar /> */}
    <Route exact path={"/"} render={() => {
    return < LandingPage/> 
    }} />
    <Route path="/signin" render={(routeProps) => {
	  return  <SignInForm onSignIn={handleSignIn} {...routeProps}  />
    }}/>
    <Route path="/signup" render={(routeProps) => {
      return  <SignUpForm {...routeProps}  />
    }}/>
     <Route component={NotFound} />
     </Switch>
    </div>
  );
}

export default App;
