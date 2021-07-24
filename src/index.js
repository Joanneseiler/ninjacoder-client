import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {createTheme, ThemeProvider } from '@material-ui/core';
import {deepPurple} from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#06b36b'
        },
        secondary: deepPurple
    }
})


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
