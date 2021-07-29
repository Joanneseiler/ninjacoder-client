import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Button, Grid, Avatar } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom"
import NinjaKittyLP from "../LandingPageNinja.png"
import flow3 from "../3.jpeg"
import ReviewCarousel from "./ReviewCarousel";

const useStyles = makeStyles((theme) => ({
    landingpage: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center"
    },
    landingHeadline: {
        backgroundColor: "#FAF3DD"
    },
    landingHeader: {
        fontSize: 80,
        marginTop: 5,
        fontFamily: "Lemonade Stand"
    },
    landingHeaderP: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    landingButton: {
        color: "white",
        textDecoration: "none",
        marginTop: 10,
        width: 150
    },
    landingPageImage: {
        marginTop: 40,
        width: "60%"
    },
    avatar: {
        maxWidth: 200,
        width: 200,
        height: 200,
        margin: 20,
      },
      flow: {
        display: "flex",
        alignItems: "center",
        flexFlow: "wrap",
        textAlign: "center",
        justifyContent: "space-around",
        padding: 10
      },
      divFlow: {
        width: 250,
        padding: 20
      },
      landingReview: {
        backgroundColor: "#68B0AB"
      },
      reviews: {
          padding: 40
      }
  }));


function LandingPage(props) {
    const classes = useStyles()

    if (props.user) {
        return <Redirect to={"/profile"}></Redirect>;
    }
    
    return(
        <>
        <div className={classes.landingHeadline}>
            <Container  className={classes.landingpage}>
                <Grid>
                    <Typography style={{marginTop: 30}} className={classes.landingHeader} component="h1" variant="h5">
                    CODING
                    </Typography>
                    <Typography className={classes.landingHeader} component="h1" variant="h5">
                    FOR KIDS
                    </Typography>
                    <Typography className={classes.landingHeaderP} component="h2" variant="h5">
                    Programming courses that playfully help your child to be equipped for a successful life
                    </Typography>
                    <Container className={classes.landingpage}>
                        <Link className={classes.landingButton}
                        to={`/signin/parent`}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.landingButton}>
                                Parent
                            </Button>
                        </Link>
                        <Link className={classes.landingButton}
                        to="/signin/tutor">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.landingButton}>
                                Tutor
                            </Button>
                        </Link>
                        <img src={NinjaKittyLP} alt="NinjaKitty" className={classes.landingPageImage}></img>
                    </Container>
                </Grid>
            </Container>
        </div>
        <div >
            <Container className={classes.landingpage}>
                <Typography className={classes.landingHeaderP} component="h2" variant="h5">
                    Your child will love learning to code with us!
                </Typography>
                <Container className={classes.flow}>
                <div className={classes.divFlow}>
                <Avatar className={classes.avatar}>
                    <img src={flow3} width='200px' alt="info" />
                </Avatar>
                <Typography className={classes.landingHeaderP} component="h2" variant="h5">
                To start, you can test whether your child enjoys coding with our free videos
                </Typography>
                </div>
                <div className={classes.divFlow}>
                <Avatar className={classes.avatar}>
                    <img src={flow3} width='200px' alt="info" />
                </Avatar>
                <Typography className={classes.landingHeaderP} component="h2" variant="h5">
                After that you can benefit from our great tutors and buy courses for your child
                </Typography>
                </div>
                <div className={classes.divFlow}>
                <Avatar className={classes.avatar}>
                    <img src={flow3} width='200px' alt="info" />
                </Avatar>
                <Typography className={classes.landingHeaderP} component="h2" variant="h5">
                Your child will learn real programming languages in a fun environment
                </Typography>
                </div>
            </Container>
            </Container>
            <div className={classes.landingReview}>
            <div className={classes.reviews}>
            Test
                {/* <ReviewCarousel/> */}
                </div>
            </div>
        </div>
        </>
    )
}

export default LandingPage;