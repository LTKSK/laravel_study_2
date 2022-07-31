import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { ReactLocation, Router } from "@tanstack/react-location";
import { RegisterPage } from "./components/RegisterPage";
import { TodoPage } from "./components/TodoPage";

const location = new ReactLocation();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router
      location={location}
      routes={[
        { path: "/", element: <App /> },
        { path: "register", element: <RegisterPage /> },
        { path: "todo", element: <TodoPage /> },
      ]}
    />
  </React.StrictMode>
);
