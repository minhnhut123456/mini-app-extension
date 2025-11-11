import { useCallback } from "react";
import { useSettingStore } from "../stores/setting";
import { toggleSidebarPosition as toggleSidebarPositionPostEvent } from "../vscode-events/fire-events";

const useSidebarPosition = () => {
  const sidebarPosition =
    useSettingStore?.((state) => state.sidebarPosition) ?? "left";
  const zToggleSidebarPosition = useSettingStore?.(
    (state) => state.toggleSidebarPosition
  );

  const toggleSidebarPosition = useCallback(() => {
    zToggleSidebarPosition?.();
    toggleSidebarPositionPostEvent();
  }, [zToggleSidebarPosition]);

  return { toggleSidebarPosition, sidebarPosition };
};

export default useSidebarPosition;
