// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { MainViewProvider } from "./main-view-provider";
import { PersistedStateKey, RegisteredCommand } from "./constants";
import { getLanguageDict } from "./global-state";
import ejs from "ejs";

const copyAndRender = async (
  src: vscode.Uri,
  dest: vscode.Uri,
  data: Record<string, any>
) => {
  const entries = await vscode.workspace.fs.readDirectory(src);

  for (const [name, type] of entries) {
    const srcPath = vscode.Uri.joinPath(src, name);
    const destPath = vscode.Uri.joinPath(dest, name.replace(/\.ejs$/, ""));

    if (type === vscode.FileType.Directory) {
      await vscode.workspace.fs.createDirectory(destPath);
      await copyAndRender(srcPath, destPath, data);
    } else if (name.endsWith(".ejs")) {
      const content = Buffer.from(
        await vscode.workspace.fs.readFile(srcPath)
      ).toString("utf8");

      const rendered = ejs.render(content, data);
      await vscode.workspace.fs.writeFile(
        destPath,
        Buffer.from(rendered, "utf8")
      );
    } else {
      const content = await vscode.workspace.fs.readFile(srcPath);
      await vscode.workspace.fs.writeFile(destPath, content);
    }
  }
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Check has just create mini app --> focus on extension view
  const hasJustCreateMiniApp = context.globalState.get<boolean>(
    PersistedStateKey.HAS_JUST_CREATE_MINI_APP
  );
  if (hasJustCreateMiniApp) {
    context.globalState.update(
      PersistedStateKey.HAS_JUST_CREATE_MINI_APP,
      false
    );
    // await vscode.commands.executeCommand(
    //   "workbench.view.extension.zalo-mini-app-clone"
    // );
  }

  const provider = new MainViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("home", provider)
  );

  // Register the command
  const disposable = vscode.commands.registerCommand(
    "zalo-mini-app-clone.openMiniApp",
    async () => {
      const folders = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: "Open mini app in new Window",
      });
      if (!folders || folders.length === 0) {
        return;
      }
      vscode.commands.executeCommand("vscode.openFolder", folders[0], true);
    }
  );

  // Register the open mini app create command
  const disposableCreateMiniApp = vscode.commands.registerCommand(
    RegisteredCommand.CREATE_MINI_APP,
    async () => {
      const t = getLanguageDict();
      const selected = await vscode.window.showQuickPick(
        [
          {
            key: "vite-ts",
            label: t("template-vite-ts-title"),
            description: t("template-vite-ts-description"),
          },
          {
            key: "vite-js",
            label: t("template-vite-js-title"),
            description: t("template-vite-js-description"),
          },
        ],
        { placeHolder: t("template-placeholder") }
      );

      if (!selected) {
        return;
      }

      // Select parent folder
      const folders = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: t("template-select-folder"),
      });

      if (!folders || folders.length === 0) {
        return;
      }

      const parentUri = folders[0];

      const folderName = await vscode.window.showInputBox({
        prompt: t("template-input-prompt", { name: selected.label }),
        placeHolder: t("template-input-placeholder"),
        validateInput: (value) => {
          if (!value.trim()) {
            return t("template-input-prompt-error-empty");
          }
          if (value.includes(" ")) {
            return t("template-input-prompt-error-space");
          }
          return null;
        },
      });

      if (!folderName) {
        return;
      }

      // Check not exist folder
      const targetUri = vscode.Uri.joinPath(parentUri, folderName);
      try {
        await vscode.workspace.fs.stat(targetUri);
        vscode.window.showErrorMessage(t("template-folder-exist"));
        return;
      } catch {}

      await vscode.workspace.fs.createDirectory(targetUri);
      // Get template folder
      const templateDirUri = vscode.Uri.joinPath(
        context.extensionUri,
        "template-generate",
        selected.key
      );

      // Copy template to target folder and open it
      await copyAndRender(templateDirUri, targetUri, { name: folderName });
      vscode.window.showInformationMessage(
        t("template-success", { name: folderName })
      );
      // Trick to focus on new folder
      context.globalState.update(
        PersistedStateKey.HAS_JUST_CREATE_MINI_APP,
        true
      );
      vscode.commands.executeCommand("vscode.openFolder", targetUri, true);
    }
  );

  context.subscriptions.push(disposable, disposableCreateMiniApp);
}

// This method is called when your extension is deactivated
export function deactivate() {}
