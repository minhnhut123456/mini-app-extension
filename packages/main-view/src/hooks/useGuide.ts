import { useSettingStore } from "../stores/setting";
import { useCallback } from "react";
import { setSetting } from "../vscode-events/fire-events";
import { DefaultLanguage, DefaultGuide } from "../stores/setting";

const useGuide = () => {
  const guide = useSettingStore?.((state) => state.guide) ?? DefaultGuide;
  const zToggleGuide = useSettingStore?.((state) => state.toggleGuide);

  const toggleGuide = useCallback(
    (value: boolean) => {
      zToggleGuide?.();
      setSetting(
        useSettingStore?.getState().language ?? DefaultLanguage,
        value
      );
    },
    [zToggleGuide]
  );

  return { guide, toggleGuide };
};

export default useGuide;
