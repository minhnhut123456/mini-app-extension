import { useCallback } from "react";
import { useSettingStore } from "../stores/setting";
import { turnDevServer as turnDevServerPostEvent } from "../vscode-events/fire-events";

const useToggleDevServer = () => {
  const startedDevServer = useSettingStore?.((state) => state.startedDevServer);

  const toggleDevServer = useCallback(() => {
    const curStartedDevServer = useSettingStore?.getState().startedDevServer;
    turnDevServerPostEvent(
      typeof curStartedDevServer === "boolean" ? !curStartedDevServer : true
    );
  }, []);

  return { toggleDevServer, startedDevServer };
};

export default useToggleDevServer;
