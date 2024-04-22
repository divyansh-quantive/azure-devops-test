import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./pages/App";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Test from "./pages/Test";
import ErrorPage from "./pages/ErrorPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("app")
);
