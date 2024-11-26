import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ResetStyle from "./styles/ResetStyle.js";
import "./index.css";
import { WorkflowProvider } from "./contexts/WorkflowContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResetStyle />
    <WorkflowProvider>
      <App />
    </WorkflowProvider>
  </StrictMode>
);
