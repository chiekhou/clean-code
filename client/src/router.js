import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";


const Chatbot = lazy(() => import("./pages/Chatbot/Chatbot"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
   
    ],
  },
]);