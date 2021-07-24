import React, { useState, useEffect } from "react";
import axios from "axios";

function Payment(props) {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const doPayment = async () => {
      try {
        let courseId = props.match.params.courseId;
        let response = await axios.get(`/courses/${courseId}/payment`, {
          withCredentials: true,
        });
        setPayment(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    doPayment();
  }, [payment]);

  if (!payment) {
    return <p>Loading...Bruh</p>;
  }
  return <div>{payment.message}</div>;
}

export default Payment;
