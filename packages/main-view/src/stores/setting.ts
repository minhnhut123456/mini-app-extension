import { create } from "zustand";
import { DevChannels, Devices } from "../constants";

export const Language = {
  En: "en",
  Vi: "vi",
} as const;

export type Language = (typeof Language)[keyof typeof Language];
export type SidebarPosition = "left" | "right";
export type DevChannels = (typeof DevChannels)[keyof typeof DevChannels];
export type Devices = (typeof Devices)[keyof typeof Devices]["key"];

type State = {
  language: Language;
  guide: boolean;
  devChannel: DevChannels;
  device: Devices;
  sidebarPosition: SidebarPosition;
  simulatorUrl: string;
};

interface SettingStore {
  language: Language;
  guide: boolean;
  sidebarPosition: SidebarPosition;
  devChannel: DevChannels;
  device: Devices;
  simulatorUrl: string;
  startedDevServer: boolean;

  setLanguage: (language: Language) => void;
  toggleGuide: () => void;
  toggleSidebarPosition: () => void;
  setDevChannel: (devChannel: DevChannels) => void;
  setDevice: (device: Devices) => void;
  toggleDevServer: () => void;
  startDevServer: (url: string) => void;
}

let useSettingStore: ReturnType<typeof _createSettingStore> | null = null;
const DefaultLanguage = Language.Vi;
const DefaultGuide = true;
const DefaultSidebarPosition = "left";
const DefaultDevChannel = DevChannels.SIMULATOR;
const DefaultDevice = Devices.IP15.key;

const _createSettingStore = (state: State) => {
  return create<SettingStore>((set) => ({
    language: state?.language || DefaultLanguage,
    guide: state?.guide || DefaultGuide,
    sidebarPosition: state?.sidebarPosition || DefaultSidebarPosition,
    devChannel: state?.devChannel || DefaultDevChannel,
    device: state?.device || DefaultDevice,
    simulatorUrl: state?.simulatorUrl || "",
    startedDevServer: false,
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
    setDevChannel: (devChannel: DevChannels) => {
      set({ devChannel });
    },
    setDevice: (device: Devices) => {
      set({ device });
    },
    toggleDevServer: () => {
      set((state) => ({ startedDevServer: !state.startedDevServer }));
    },
    startDevServer: (url: string) => {
      set({ simulatorUrl: url, startedDevServer: true });
    },
  }));
};

const createSettingStore = (setting: State) => {
  useSettingStore = _createSettingStore(setting);
};

export {
  useSettingStore,
  createSettingStore,
  DefaultLanguage,
  DefaultGuide,
  DefaultSidebarPosition,
  DefaultDevChannel,
  DefaultDevice,
};
