import * as vscode from "vscode";
import fs from "fs";
import path from "path";
import {
  setAppState,
  appState,
  SidebarPosition,
  WebviewAppState,
} from "./global-state";
import { MessageType, PersistedStateKey, RegisteredCommand } from "./constants";

export class MainViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _extension: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extension.extensionUri],
    };

    //  Sidebar position
    const sidebarPosition = vscode.workspace
      .getConfiguration("workbench")
      .get<SidebarPosition>("sideBar.location");

    const webviewAppState = this._extension.globalState.get<
      Pick<WebviewAppState, "language" | "guide">
    >(PersistedStateKey.WEBVIEW_APP_SETTING);

    // Update global app state from persisted data
    setAppState({
      language: webviewAppState?.language,
      guide: webviewAppState?.guide,
      sidebarPosition: sidebarPosition,
    });

    const distUri = vscode.Uri.joinPath(
      this._extension.extensionUri,
      "packages",
      "main-view",
      "dist"
    );
    const webviewDistUri = webview.asWebviewUri(distUri);

    let html = fs.readFileSync(path.join(distUri.fsPath, "index.html"), "utf8");

    // Replace place holder base path in dist files
    const baseUrl = webviewDistUri.toString() + "/";
    html = html.replaceAll("/__webview_base__/", baseUrl);
    const files = fs.readdirSync(path.join(distUri.fsPath, "assets"));
    for (const file of files) {
      if (/\.(css|js)$/.test(file)) {
        const filePath = path.join(distUri.fsPath, "assets", file);
        let content = fs.readFileSync(filePath, "utf8");
        content = content.replaceAll("/__webview_base__/", baseUrl);
        fs.writeFileSync(filePath, content, "utf8");
      }
    }

    // Inject initial app state
    html = html.replaceAll("__init_app_setting__", JSON.stringify(appState));

    // Handle messages from the webview
    webview.onDidReceiveMessage((message) => {
      switch (message.type) {
        case MessageType.SET_SETTING:
          // Persist setting
          this._extension.globalState.update(
            PersistedStateKey.WEBVIEW_APP_SETTING,
            message.payload
          );

          // Update global app state
          setAppState(message.payload);
          break;
        case MessageType.TOGGLE_SIDEBAR_POSITION:
          vscode.commands.executeCommand(
            "workbench.action.toggleSidebarPosition"
          );
          break;

        case MessageType.TRIGGER_CREATE_MINI_APP:
          vscode.commands.executeCommand(RegisteredCommand.CREATE_MINI_APP);
          break;
      }
    });

    webview.html = html;
  }
}
