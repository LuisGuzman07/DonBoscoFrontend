// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  useRoutes,
} from "react-router-dom";
import "./index.css";

import { Routes } from "./Routes";
import { AuthProvider } from "./app/contexts/AuthContext";

function App() {
  // hook interno que monta todas las rutas
  const element = useRoutes(Routes);
  return element;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
