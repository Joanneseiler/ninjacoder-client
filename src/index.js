import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {createTheme, ThemeProvider } from '@material-ui/core';
import {cyan} from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8FC0A9'
        },
        secondary: cyan
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
