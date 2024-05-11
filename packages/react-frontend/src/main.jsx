import React from "react";
import ReactDOMClient from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MyApp from "./MyApp";
import ErrorPage from "./error-page";
import Login from "./Login";
import "./main.css";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div><MyApp /></div>,
      errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login mode="login"/>,
    },
    {
        path: "/signup",
        element: <Login mode="signup" />,
    }
  ]);

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render:
root.render(
<React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>);