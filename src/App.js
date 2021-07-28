import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
import NotFound from "./components/NotFound";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Profile from "./components/profile/Profile";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Payment from "./components/Payment";
import EditCourse from "./components/EditCourse";
import Account from "./components/profile/Account";
import ParentCourseDetail from "./components/ParentCourseDetail";
import {API_URL} from "./config"

function App() {
  let history = useHistory();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [signInError, setSignInError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [fetchingUser, setfetchingUser] = useState(true);

  const fetchUser = async () => {
    let userResponse = await axios.get(`${API_URL}/api/user`, {
      withCredentials: true,
    });
    setUser(userResponse.data);
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        let response = await axios.get(`${API_URL}/api/courses`, {
          withCredentials: true, // When sending requests from client-side JavaScript, by default cookies are not passed. So to enable passing of cookies, we need to use this property to true
        });
        setCourses(response.data);
        await fetchUser();
        setfetchingUser(false);
      } catch (err) {
        console.log(err);
        setfetchingUser(false);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    if (
      (history.location.pathname === "/signin" ||
        history.location.pathname === "/signup") &&
      user
    ) {
      history.push("/profile");
    }
    if (!user && !fetchingUser) {
      history.push("/");
    } else {
      history.push(history.location.pathname);
    }
  }, [user, history, fetchingUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    const {
      username,
      role,
      email,
      password,
      repeatedPassword,
      kidAge,
      secretWord,
    } = event.target;
    let newUser = {
      username: username.value,
      role: role.value,
      email: email.value,
      password: password.value,
      repeatedPassword: repeatedPassword.value,
    };

    if (role.value === "parent") {
      newUser.kidAge = kidAge.value;
      newUser.secretWord = secretWord.value;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/signup`,
        newUser,
        { withCredentials: true }
      );
      setUser(response.data);
      setSignUpError(null);
    } catch (err) {
      setSignUpError(err.response.data.errorMessage);
    }
  };

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
        `${API_URL}/api/signin`,
        submittedUser,
        { withCredentials: true }
      );
      response.data.role = submittedUser.role;
      setUser(response.data);
      setSignInError(null);
    } catch (err) {
      setSignInError(err.response.data.errorMessage);
    }
  };

  const handleLogOut = async () => {
    try {
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      history.push("/");
    } catch {
      console.log("Logout failed");
    }
  };

  // Add Courses
  const handleAddCourse = async (event) => {
    event.preventDefault();
    //to deal with images
    let formData = new FormData();
    formData.append("imageUrl", event.target.image.files[0]);

    let imgResponse = await axios.post(
      `${API_URL}/api/upload`,
      formData,
      { withCredentials: true }
    );

    let newCourse = {
      name: event.target.name.value,
      description: event.target.description.value,
      image: imgResponse.data.image,
      video: event.target.video.value,
      price: event.target.price.value,
    };

    try {
      let courseResponse = await axios.post(
        `${API_URL}/api/tutor/courses/add`,
        newCourse,
        { withCredentials: true }
      );
      setCourses([courseResponse.data, ...courses]);
      await fetchUser();
      history.push("/profile");
    } catch (err) {
      console.log("Course creation failed", err);
    }
  };

  // Edit Course
  const handleEditCourse = async (event, course) => {
    event.preventDefault();

    await axios.patch(
      `${API_URL}/api/tutor/courses/${course._id}`,
      course,
      { withCredentials: true }
    );
    try {
      let updatedCourse = courses.map((singleCourse) => {
        if (singleCourse._id === course._id) {
          singleCourse.name = course.name;
          singleCourse.description = course.description;
          singleCourse.video = course.video;
          singleCourse.price = course.price;
        }
        return singleCourse;
      });
      setCourses(updatedCourse);
    } catch (err) {
      console.log(err.response.data.error); //error to be common
    }
  };

  // Delete
  const handleDeleteCourse = async (courseId) => {
    await axios.delete(`${API_URL}/api/tutor/courses/${courseId}`, {
      withCredentials: true,
    });
    let filteredCourses = courses.filter((singleCourse) => {
      return singleCourse._id !== courseId;
    });
    setCourses(filteredCourses);
  };

  return (
    <div>
      <NavBar user={user} onLogOut={handleLogOut} />
      <Switch>
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
            return (
              <SignInForm
                error={signInError}
                onSignIn={handleSignIn}
                {...routeProps}
              />
            );
          }}
        />
        <Route
          path="/signup"
          render={(routeProps) => {
            return (
              <SignUpForm
                error={signUpError}
                onSignUp={handleSignUp}
                {...routeProps}
              />
            );
          }}
        />
        <Route
          path="/profile"
          render={(routeProps) => {
            return <Profile {...routeProps} />;
          }}
        />
        <Route
          path="/account"
          render={(routeProps) => {
            return (
              <Account
                logoutUser={handleLogOut}
                fetchUser={fetchUser}
                user={user}
                {...routeProps}
              />
            );
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
          path={"/parent/:courseId"}
          render={(routeProps) => {
            return <ParentCourseDetail {...routeProps} />;
          }}
        />
        <Route
          exact
          path={"/courses"}
          render={() => {
            return <Courses courses={courses} />;
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
        <Route
          exact
          path={"/courses/:courseId/edit"}
          render={(routeProps) => {
            return (
              <EditCourse
                onDelete={handleDeleteCourse}
                onEditCourse={handleEditCourse}
                {...routeProps}
              />
            );
          }}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
