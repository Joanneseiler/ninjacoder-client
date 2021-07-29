import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import LoadingIndicator from "./LoadingIndicator";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PaymentNinja from "../paymentNinjaPage.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 40,
    padding: 10,
    textAlign: "center",
  },
  msgSuccess: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    width: "100%",
    maxWidth: 720,
    fontWeight: 600,
  },
  sucessPaymntImg: {
    width: "40%",
    marginBottom: 10,
  },
  profilePageButton: {
    textDecoration: "none",
    width: "250px",
  },
}));

function Payment(props) {
  const [payment, setPayment] = useState(null);
  const classes = useStyles();

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
  return (
    <div>
      <Container className={classes.container}>
        <Typography component="h1" className={classes.header} variant="h5">
          {payment.message}
        </Typography>
        <img
          src={PaymentNinja}
          alt="Success-payment"
          className={classes.sucessPaymntImg}
        ></img>
        <Link className={classes.profilePageButton} to="/profile">
          <Button
            style={{ color: "white" }}
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.profilePageButton}
          >
            Go to your profile
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default Payment;
