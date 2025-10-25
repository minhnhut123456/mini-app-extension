// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { MainViewProvider } from "./main-view-provider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const provider = new MainViewProvider(context.extensionUri);
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
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
