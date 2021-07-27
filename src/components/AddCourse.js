import * as React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";
import SignInLogo from "../Login-logo.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(1),
  },
}));

function AddCourse(props) {
  const classes = useStyles();
  const { onAddCourse } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          style={{ width: "40px", margin: "15px" }}
          src={SignInLogo}
          alt="Sign in Logo"
        />
        <Typography component="h1" variant="h5">
          Add a course
        </Typography>

        <form
          className={classes.form}
          onSubmit={onAddCourse}
          encType="multipart/form-data"
        >
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Course name"
            name="name"
            type="text"
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            multiline
            id="description"
            label="Course description"
            name="description"
            type="text"
            rows={5}
            className={classes.textField}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="price"
            label="Price course"
            name="price"
            type="number"
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="video"
            label="Video Url : https://www.youtube.com/watch?v="
            name="video"
            type="text"
            className={classes.textField}
          />

          <input name="image" type="file" accept="image/png, image/jpeg" />
          {/* <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/profile"}
          > */}
          <Button
            style={{ color: "white" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit course
          </Button>
          {/* </Link> */}
        </form>
      </div>
    </Container>
  );
}

export default AddCourse;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

// export default function MultilineTextFields() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState('Controlled');

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

// //   return (
// //     <form className={classes.root} noValidate autoComplete="off">
// //       <div>
// //         <TextField
// //           id="standard-multiline-flexible"
// //           label="Multiline"
// //           multiline
// //           maxRows={4}
// //           value={value}
// //           onChange={handleChange}
// //         />
// //         <TextField
// //           id="standard-textarea"
// //           label="Multiline Placeholder"
// //           placeholder="Placeholder"
//           multiline
//         />
//         <TextField
//           id="standard-multiline-static"
//           label="Multiline"
//           multiline
//           rows={4}
//           defaultValue="Default Value"
//         />
//       </div>
//       <div>
//         <TextField
//           id="filled-multiline-flexible"
//           label="Multiline"
//           multiline
//           maxRows={4}
//           value={value}
//           onChange={handleChange}
//           variant="filled"
//         />
//         <TextField
//           id="filled-textarea"
//           label="Multiline Placeholder"
//           placeholder="Placeholder"
//           multiline
//           variant="filled"
//         />
//         <TextField
//           id="filled-multiline-static"
//           label="Multiline"
//           multiline
//           rows={4}
//           defaultValue="Default Value"
//           variant="filled"
//         />
//       </div>
//       <div>
//         <TextField
//           id="outlined-multiline-flexible"
//           label="Multiline"
//           multiline
//           maxRows={4}
//           value={value}
//           onChange={handleChange}
//           variant="outlined"
//         />
//         <TextField
//           id="outlined-textarea"
//           label="Multiline Placeholder"
//           placeholder="Placeholder"
//           multiline
//           variant="outlined"
//         />
//         <TextField
//           id="outlined-multiline-static"
//           label="Multiline"
//           multiline
//           rows={4}
//           defaultValue="Default Value"
//           variant="outlined"
//         />
//       </div>
//     </form>
//   );
// }
