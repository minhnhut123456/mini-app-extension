import { vscodeApi } from "@/stores/vs-code-api";

export const toggleSidebarPosition = () => {
  vscodeApi?.postMessage({
    type: "toggle-sidebar-position",
  });
};

export const triggerCreateMiniApp = () => {
  vscodeApi?.postMessage({
    type: "trigger-create-mini-app",
  });
};

export const turnOnDevServer = (port: number) => {
  console.log("asjasjhan");
  vscodeApi?.postMessage({
    type: "turn-on-dev-server",
    payload: {
      port,
    },
  });
};

export const turnOffDevServer = () => {
  vscodeApi?.postMessage({
    type: "turn-off-dev-server",
  });
};
