import { create } from "zustand";

export const Language = {
  En: "en",
  Vi: "vi",
} as const;

export type Language = (typeof Language)[keyof typeof Language];
export type SidebarPosition = "left" | "right";

type State = {
  language: Language;
  guide: boolean;
  sidebarPosition: SidebarPosition;
};

interface SettingStore {
  language: Language;
  guide: boolean;
  sidebarPosition: SidebarPosition;
  setLanguage: (language: Language) => void;
  toggleGuide: () => void;
  toggleSidebarPosition: () => void;
}

let useSettingStore: ReturnType<typeof _createSettingStore> | null = null;

const _createSettingStore = (state: State) => {
  return create<SettingStore>((set) => ({
    language: state?.language || Language.Vi,
    guide: state?.guide || true,
    sidebarPosition: state?.sidebarPosition || "left",
    setLanguage: (language: Language) => {
      set({ language });
    },
    toggleGuide: () => {
      set((state) => ({ guide: !state.guide }));
    },
    toggleSidebarPosition: () => {
      set((state) => ({
        sidebarPosition: state.sidebarPosition === "left" ? "right" : "left",
      }));
    },
  }));
};

const createSettingStore = (setting: State) => {
  useSettingStore = _createSettingStore(setting);
};

export { useSettingStore, createSettingStore };
