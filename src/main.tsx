import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { setupInterceptors } from "./lib/apiRequest.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

await setupInterceptors();

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
