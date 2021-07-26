import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8FC0A9'
        },
        secondary: {
            light: "#00b8d4",
            main: "#00838f",
            dark: "#006064"
        }
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
