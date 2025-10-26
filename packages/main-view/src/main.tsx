import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";
import { createSettingStore, useSettingStore } from "./stores/setting";
import { initVscodeApi, vscodeApi } from "./stores/vs-code-api";

if (!vscodeApi) {
  initVscodeApi();
}
if (!useSettingStore) {
  createSettingStore(window.__INIT_APP_SETTING__);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
