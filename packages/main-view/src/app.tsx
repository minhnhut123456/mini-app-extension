import { useState } from "react";
import Home from "./components/home";
import Setting from "./components/setting";
import clsx from "clsx";
import useI18n from "./hooks/useI18n";

const Tab = {
  Home: "home",
  Setting: "setting",
} as const;

type Tab = (typeof Tab)[keyof typeof Tab];

function App() {
  const [tab, setTab] = useState<Tab>(Tab.Home);
  const t = useI18n();

  return (
    <div>
      <div className="flex items-center">
        <div
          onClick={() => setTab(Tab.Home)}
          className={clsx(
            "flex-1 flex items-center gap-2 px-2 py-1 cursor-pointer text-center text-[var(--vscode-button-foreground)] justify-center",
            tab === Tab.Home
              ? "bg-[var(--vscode-tab-activeBackground)]"
              : "bg-[var(--vscode-tab-inactiveBackground)]"
          )}
        >
          {t("main-home-title")}
        </div>
        <div
          onClick={() => setTab(Tab.Setting)}
          className={clsx(
            "flex-1 flex items-center gap-2 px-2 py-1 cursor-pointer text-center text-[var(--vscode-button-foreground)] justify-center",
            tab === Tab.Setting
              ? "bg-[var(--vscode-tab-activeBackground)]"
              : "bg-[var(--vscode-tab-inactiveBackground)]"
          )}
        >
          {t("main-setting-title")}
        </div>
      </div>
      {tab === Tab.Home && <Home />}
      {tab === Tab.Setting && <Setting />}
    </div>
  );
}

export default App;
