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
  port: number;
};

interface SettingStore {
  language: Language;
  guide: boolean;
  sidebarPosition: SidebarPosition;
  devChannel: DevChannels;
  device: Devices;
  startedDevServer: boolean;
  port: number;

  setLanguage: (language: Language) => void;
  toggleGuide: () => void;
  toggleSidebarPosition: () => void;
  setDevChannel: (devChannel: DevChannels) => void;
  setDevice: (device: Devices) => void;
  startDevServer: () => void;
  stopDevServer: () => void;
  setPort: (port: number) => void;
}

let useSettingStore: ReturnType<typeof _createSettingStore> | null = null;
const DefaultLanguage = Language.Vi;
const DefaultGuide = true;
const DefaultSidebarPosition = "left";
const DefaultDevChannel = DevChannels.SIMULATOR;
const DefaultDevice = Devices.IP15.key;
const DefaultPort = 3001;

const _createSettingStore = (state: State) => {
  return create<SettingStore>((set) => ({
    language: state?.language || DefaultLanguage,
    guide: state?.guide || DefaultGuide,
    sidebarPosition: state?.sidebarPosition || DefaultSidebarPosition,
    devChannel: state?.devChannel || DefaultDevChannel,
    device: state?.device || DefaultDevice,
    startedDevServer: false,
    port: state?.port || DefaultPort,
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
    startDevServer: () => {
      set({ startedDevServer: true });
    },
    stopDevServer: () => {
      set({ startedDevServer: false });
    },
    setPort: (port: number) => {
      set({ port });
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
