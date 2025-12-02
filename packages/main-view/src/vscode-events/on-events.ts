import { useSettingStore } from "@/stores/setting";

export const registerVscodeApiEvents = () => {
  window.addEventListener("message", (event) => {
    const message = event.data;
    const { type } = message ?? {};

    switch (type) {
      case "start-dev-server-success":
        useSettingStore?.getState()?.startDevServer();
        break;
      case "stop-dev-server-success":
        useSettingStore?.getState()?.stopDevServer();
        break;
    }
  });
};
