import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Footer } from "./components/Footer.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <App />
    <Footer />
  </>
);
