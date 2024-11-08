import "./main.css";
import { createRoot, Container } from "react-dom/client";

import "./reportWebVitals";
import router from "@/router";
import { RouterProvider } from "react-router-dom";
import App from "./App";

const domRootNode = document.getElementById("root");
const root = createRoot(domRootNode as Container);

// root.render(<RouterProvider router={router} />);
root.render(<App />);
