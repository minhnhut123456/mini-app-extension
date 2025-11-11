import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";
import { createSettingStore } from "./stores/setting";
import { initVscodeApi } from "./stores/vs-code-api";
import { registerVscodeApiEvents } from "./vscode-events/on-events";

initVscodeApi();
createSettingStore(window.__INIT_APP_SETTING__);
registerVscodeApiEvents();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
