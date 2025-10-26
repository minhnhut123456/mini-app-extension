import { vscodeApi } from "@/stores/vs-code-api";
import { useSettingStore } from "../stores/setting";
import { Language } from "../stores/setting";
import { useCallback } from "react";

const useLanguage = () => {
  const language = useSettingStore?.((state) => state.language) ?? Language.En;
  const zSetLanguage = useSettingStore?.((state) => state.setLanguage);

  const setLanguage = useCallback(
    (language: Language) => {
      zSetLanguage?.(language);
      vscodeApi?.postMessage({
        type: "set-setting",
        payload: {
          language: language,
          guide: useSettingStore?.getState().guide,
        },
      });
    },
    [zSetLanguage]
  );

  return { language, setLanguage };
};

export default useLanguage;
