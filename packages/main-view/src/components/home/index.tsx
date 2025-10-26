import { HomeIcon } from "lucide-react";

const Home = () => {
  return (
    <div>
      <div className="gap-2 flex items-center px-2 py-1 text-[var(--vscode-tab-inactiveForeground)] bg-[var(--vscode-tab-activeBackground)]">
        <HomeIcon /> Home
      </div>
      <div className="flex items-center bg-[var(--vscode-tab-inactiveBackground)] p-2 gap-3">
        <button className="text-[var(--vscode-button-foreground)] bg-[var(--vscode-button-background)] px-2 py-1 rounded">
          New mini app
        </button>
        <button className="text-[var(--vscode-button-foreground)] bg-[var(--vscode-tab-activeBackground)] px-2 py-1 rounded">
          Open mini app
        </button>
        <button className="text-[var(--vscode-button-foreground)] bg-[var(--vscode-tab-activeBackground)] px-2 py-1 rounded">
          Close mini app
        </button>
      </div>
      <div className="gap-2 flex items-center px-2 py-1 text-[var(--vscode-tab-inactiveForeground)] bg-[var(--vscode-tab-activeBackground)]">
        Recent project
      </div>
    </div>
  );
};

export default Home;
