import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// StrictMode removed — it double-fires useEffect which kills GSAP animations
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
