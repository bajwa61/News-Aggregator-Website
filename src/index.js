import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./routes";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
// import { createTheme, MantineProvider } from '@mantine/core';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <MantineProvider > */}
      <RouterProvider router={router} />
      <ToastContainer />
    {/* </MantineProvider> */}
  </React.StrictMode>
);
