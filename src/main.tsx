import React from 'react';
import './main.css';
import { createRoot, Container } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import App from './App';
import './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

const domRootNode = document.getElementById('root');
const root = createRoot(domRootNode as Container);

root.render(<RouterProvider router={router} />);

