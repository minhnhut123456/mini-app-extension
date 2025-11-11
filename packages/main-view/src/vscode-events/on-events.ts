import { useSettingStore } from "@/stores/setting";

export const registerVscodeApiEvents = () => {
  window.addEventListener("message", (event) => {
    const message = event.data;
    const { type, payload } = message ?? {};

    switch (type) {
      case "start-dev-server":
        useSettingStore?.getState()?.startDevServer(payload?.url);
        break;
    }
  });
};
