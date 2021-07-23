import React from "react";
import { Switch, Route } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";



function App() {
  return (
    <div>
     <SignInForm/>
     <SignUpForm/>
    </div>
  );
}

export default App;
