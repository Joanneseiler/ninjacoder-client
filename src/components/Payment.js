import React, { useState, useEffect } from "react";
import axios from "axios";
import {API_URL} from "../config"
import LoadingIndicator from "./LoadingIndicator";

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
    return <LoadingIndicator></LoadingIndicator>;
  }
  return <div>{payment.message}</div>;
}

export default Payment;
