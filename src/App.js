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
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Payment from "./components/Payment";

//Coding :

function App() {
  let history = useHistory();
  const [user, setUser] = React.useState(null);
  const isFirstRender = useRef(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        let response = await axios.get("http://localhost:5005/api/courses", {
          withCredentials: true, // When sending requests from client-side JavaScript, by default cookies are not passed. So to enable passing of cookies, we need to use this property to true
        });
        setCourses(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    history.push("/");
  }, [user, history]);

  // Sign in
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
        { withCredentials: true } // When sending requests from client-side JavaScript, by default cookies are not passed. So to enable passing of cookies, we need to use this property to true
      );
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add Courses
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

  // Searchbar
  const handleSearch = (event) => {
    let searchedCourse = event.target.value;

    let filteredCourses = courses.filter((singleCourse) => {
      return singleCourse.name
        .toLoweCase()
        .includes(searchedCourse.toLoweCase());
    });
    setFilteredCourses(filteredCourses);
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
          exact
          path={"/courses"}
          render={() => {
            return (
              <Courses onSearch={handleSearch} courses={filteredCourses} />
            );
          }}
        />
        <Route
          exact
          path={"/courses/:courseId"}
          render={(routeProps) => {
            return <CourseDetail {...routeProps} />;
          }}
        />
        <Route
          exact
          path={"/courses/:courseId/payment"}
          render={(routeProps) => {
            return <Payment {...routeProps} />;
          }}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
