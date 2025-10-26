import { useSettingStore } from "../stores/setting";
import { useCallback } from "react";
import { vscodeApi } from "../stores/vs-code-api";

const useGuide = () => {
  const guide = useSettingStore?.((state) => state.guide) ?? false;
  const zToggleGuide = useSettingStore?.((state) => state.toggleGuide);

  const toggleGuide = useCallback(
    (value: boolean) => {
      zToggleGuide?.();
      vscodeApi?.postMessage({
        type: "set-setting",
        payload: {
          language: useSettingStore?.getState().language,
          guide: value,
        },
      });
    },
    [zToggleGuide]
  );

  return { guide, toggleGuide };
};

export default useGuide;
