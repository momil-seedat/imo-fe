import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // Update the import path if necessary
import { AuthContextProvider } from "./context";
import { UserContextProvider } from "./context/UserContext";
import { MaterialUIControllerProvider } from "./context";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <UserContextProvider>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  rootElement
);
