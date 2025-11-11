import { useSettingStore } from "../stores/setting";
import { Language } from "../stores/setting";
import { useCallback } from "react";
import { setSetting } from "../vscode-events/fire-events";
import { DefaultGuide } from "../stores/setting";

const useLanguage = () => {
  const language = useSettingStore?.((state) => state.language) ?? Language.En;
  const zSetLanguage = useSettingStore?.((state) => state.setLanguage);

  const setLanguage = useCallback(
    (language: Language) => {
      zSetLanguage?.(language);
      setSetting(language, useSettingStore?.getState().guide ?? DefaultGuide);
    },
    [zSetLanguage]
  );

  return { language, setLanguage };
};

export default useLanguage;
