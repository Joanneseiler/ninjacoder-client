import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import Box from "@material-ui/core/Box";
import {API_URL} from "../config"

export default function SimpleRating(props) {
  const { isReadOnly, courseDetail } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getReview = async () => {
      try {
        const currentPath = window.location.pathname;
        let review = await axios.get(
          currentPath === "/courses"
            ? `${API_URL}/api/courses/${courseDetail._id}/rating`
            : `${API_URL}/api/parent/${courseDetail._id}/rating`,
          {
            withCredentials: true, // When sending requests from client-side JavaScript, by default cookies are not passed. So to enable passing of cookies, we need to use this property to true
          }
        );
        console.log(review);
        setValue(review.data[0].rate);
      } catch (err) {
        console.log(err);
      }
    };
    getReview();
  }, []);

  const handleCourseReview = (newValue, courseId) => {
    let newReview = {
      rate: newValue,
      date: new Date(),
      feedback: "My feedback",
      courseId: courseId,
    };
    console.log(newReview);
    axios
      .post(`${API_URL}/api/courses/rating`, newReview, {
        withCredentials: true,
      })
      .then((courseUpdated) => console.log(courseUpdated))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        {isReadOnly ? (
          <Rating
            name="rating"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            readOnly
          />
        ) : (
          <Rating
            name="rating"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              handleCourseReview(newValue, courseDetail._id);
            }}
          />
        )}
      </Box>
    </div>
  );
}
