import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthGuard } from "./components/AuthGuard";
import { Home } from "./Home";
import { ReactLocation, Router } from "@tanstack/react-location";
import { RegisterPage } from "./components/RegisterPage";
import { LoginPage } from "./components/LoginPage";
import { TodoPage } from "./components/TodoPage";

const location = new ReactLocation();
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Router
        location={location}
        routes={[
          {
            path: "/",
            element: (
              <AuthGuard>
                <Home />
              </AuthGuard>
            ),
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "todo",
            element: (
              <AuthGuard>
                <TodoPage />
              </AuthGuard>
            ),
          },
        ]}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
