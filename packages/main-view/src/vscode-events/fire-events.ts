import { vscodeApi } from "@/stores/vs-code-api";

export const setSetting = (language: string, guide: boolean) => {
  vscodeApi?.postMessage({
    type: "set-setting",
    payload: {
      language: language,
      guide: guide,
    },
  });
};

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

export const turnDevServer = (isTurnOn: boolean) => {
  vscodeApi?.postMessage({
    type: "turn-dev-server",
    payload: {
      isTurnOn: isTurnOn,
    },
  });
};
