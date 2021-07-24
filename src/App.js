//Setup needed
import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";

//Component imported
// import NavBar from "./components/NavBar";

// Pages imported
import NotFound from "./components/NotFound";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import LandingPage from "./components/LandingPage";
import AddCourse from "./components/AddCourse";
import Course from "./components/Course";

//Coding :

function App() {
  let history = useHistory();
  const [user, setUser] = React.useState(null);
  const isFirstRender = useRef(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    history.push("/");
  }, [user, history]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const { role, email, password } = event.target;
    const submittedUser = {
      role: role.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await axios.post(
        `http://localhost:5005/api/signin`,
        submittedUser,
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCourse = async (event) => {
    event.preventDefault();
    //to deal with images
    let formData = new FormData();
    formData.append("imageUrl", event.target.image.files[0]);

    let imgResponse = await axios.post(
      "http://localhost:5005/api/upload",
      formData,
      { withCredentials: true }
    );
    console.log(imgResponse);

    let newCourse = {
      name: event.target.name.value,
      description: event.target.description.value,
      image: imgResponse.data.image,
      video: event.target.video.value,
      price: event.target.price.value,
    };

    try {
      let courseResponse = await axios.post(
        "http://localhost:5005/api/tutor/courses/add",
        newCourse,
        { withCredentials: true }
      );
      setCourses([courseResponse.data, ...courses]);
    } catch (err) {
      console.log("Course creation failed", err);
    }
  };

  return (
    <div>
      <Switch>
        {/* <NavBar /> */}
        <Route
          exact
          path={"/"}
          render={() => {
            return <LandingPage />;
          }}
        />
        <Route
          path="/signin"
          render={(routeProps) => {
            return <SignInForm onSignIn={handleSignIn} {...routeProps} />;
          }}
        />
        <Route
          path="/signup"
          render={(routeProps) => {
            return <SignUpForm {...routeProps} />;
          }}
        />
        <Route
          path={"/create-course"}
          render={() => {
            return <AddCourse onAddCourse={handleAddCourse} />;
          }}
        />
        <Route
          path={"/courses"}
          render={() => {
            return <Course courses={courses} />;
          }}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
