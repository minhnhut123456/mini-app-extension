import { HomeIcon } from "lucide-react";
import useI18n from "@/hooks/useI18n";
import { vscodeApi } from "@/stores/vs-code-api";

const Home = () => {
  const t = useI18n();

  return (
    <div>
      <div className="gap-2 flex items-center px-2 py-1 text-[var(--vscode-tab-inactiveForeground)] bg-[var(--vscode-tab-activeBackground)]">
        <HomeIcon /> {t("home-title")}
      </div>
      <div className="flex items-center bg-[var(--vscode-tab-inactiveBackground)] p-2 gap-3">
        <button
          onClick={() => {
            vscodeApi?.postMessage({
              type: "trigger-create-mini-app",
            });
          }}
          className="text-[var(--vscode-button-foreground)] bg-[var(--vscode-button-background)] px-2 py-1 rounded"
        >
          {t("home-button-new-mini-app")}
        </button>
        <button className="text-[var(--vscode-button-foreground)] bg-[var(--vscode-tab-activeBackground)] px-2 py-1 rounded">
          {t("home-button-open-mini-app")}
        </button>
        <button className="text-[var(--vscode-button-foreground)] bg-[var(--vscode-tab-activeBackground)] px-2 py-1 rounded">
          {t("home-button-close-mini-app")}
        </button>
      </div>
      <div className="gap-2 flex items-center px-2 py-1 text-[var(--vscode-tab-inactiveForeground)] bg-[var(--vscode-tab-activeBackground)]">
        {t("home-recent-project-title")}
      </div>
    </div>
  );
};

export default Home;
