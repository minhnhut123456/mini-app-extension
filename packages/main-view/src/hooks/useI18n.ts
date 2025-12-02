import { useCallback } from "react";
import { DefaultLanguage, useSettingStore } from "@/stores/setting";
import en from "../i18n/en.json";
import vi from "../i18n/vi.json";

const useI18n = () => {
  const language =
    useSettingStore?.((state) => state.language) ?? DefaultLanguage;
  const i18n = useCallback(
    (key: string) => {
      return language === "en"
        ? en[key as keyof typeof en] || key
        : vi[key as keyof typeof vi] || key;
    },
    [language]
  );

  return i18n;
};

export default useI18n;
