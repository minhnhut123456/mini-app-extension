import vi from "./i18n/vi.json";
import en from "./i18n/en.json";
import ejs from "ejs";

type Lang = "vi" | "en";
type SidebarPosition = "left" | "right";
type WebviewAppState = {
  language: Lang;
  guide: boolean;
  sidebarPosition: SidebarPosition;
};
const DefaultLanguage = "vi";
const DefaultGuide = true;
const DefaultSidebarPosition = "left";

// Global state
// For web view app state
let appState: WebviewAppState = {
  language: DefaultLanguage,
  guide: DefaultGuide,
  sidebarPosition: DefaultSidebarPosition,
};

const setAppState = (state: Partial<WebviewAppState>) => {
  appState = {
    language: state.language || appState.language,
    guide: state.guide || appState.guide,
    sidebarPosition: state.sidebarPosition || appState.sidebarPosition,
  };
};

type Dict = Record<string, string>;
const getLanguageDict = () => {
  const dict: Dict = appState.language === "vi" ? vi : en;

  const t = (key: string, data: Record<string, any> = {}) => {
    const template = dict[key] || key;
    try {
      // ⚡ render EJS template
      return ejs.render(template, data);
    } catch (err) {
      console.error(`EJS render error for key: ${key}`, err);
      return key;
    }
  };

  return t;
};

export {
  getLanguageDict,
  appState,
  setAppState,
  DefaultLanguage,
  DefaultGuide,
  DefaultSidebarPosition,
  WebviewAppState,
  SidebarPosition,
};
