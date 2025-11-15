import React from "react";
import { createRoot } from "react-dom/client";
import { IonApp, setupIonicReact } from "@ionic/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

setupIonicReact();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IonApp>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IonApp>
  </React.StrictMode>
);
