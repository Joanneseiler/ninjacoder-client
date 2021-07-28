import React, { useState, useEffect } from "react";
import axios from "axios";
import {API_URL} from "../config"

function Payment(props) {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const doPayment = async () => {
      try {
        let courseId = props.match.params.courseId;
        let response = await axios.get(
          `${API_URL}/api/courses/${courseId}/payment`,
          {
            withCredentials: true,
          }
        );
        setPayment(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    doPayment();
  }, []);

  if (!payment) {
    return <p>Loading...</p>;
  }
  return <div>{payment.message}</div>;
}

export default Payment;
