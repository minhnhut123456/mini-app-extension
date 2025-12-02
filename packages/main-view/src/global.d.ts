import type { Language, SidebarPosition } from "./stores/setting";

export {};

declare global {
  /** VS Code Webview API type */
  interface VsCodeApi<T = unknown> {
    postMessage: (message: T) => void;
    setState: (state: T) => void;
    getState: () => T | undefined;
  }

  /** Extend the window interface */
  interface Window {
    /** Injected initial state from extension */
    __INIT_APP_SETTING__: {
      language: Language;
      guide: boolean;
      sidebarPosition: SidebarPosition;
      devChannel: DevChannels;
      device: Devices;
      port: number;
    };

    /** Global acquire function (injected by VS Code) */
    acquireVsCodeApi: <T = unknown>() => VsCodeApi<T>;
  }
}
