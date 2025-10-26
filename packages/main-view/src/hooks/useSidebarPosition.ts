import { useCallback } from "react";
import { useSettingStore } from "../stores/setting";
import { vscodeApi } from "../stores/vs-code-api";

const useSidebarPosition = () => {
  const sidebarPosition =
    useSettingStore?.((state) => state.sidebarPosition) ?? "left";
  const zToggleSidebarPosition = useSettingStore?.(
    (state) => state.toggleSidebarPosition
  );

  const toggleSidebarPosition = useCallback(() => {
    zToggleSidebarPosition?.();
    vscodeApi?.postMessage({
      type: "toggle-sidebar-position",
    });
  }, [zToggleSidebarPosition]);

  return { toggleSidebarPosition, sidebarPosition };
};

export default useSidebarPosition;
