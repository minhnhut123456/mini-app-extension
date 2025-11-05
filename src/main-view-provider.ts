import * as vscode from "vscode";
import {
  setAppState,
  appState,
  SidebarPosition,
  WebviewAppState,
} from "./global-state";
import { MessageType, PersistedStateKey, RegisteredCommand } from "./constants";

export class MainViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _extension: vscode.ExtensionContext) {}

  async resolveWebviewView(webviewView: vscode.WebviewView) {
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

    // --- Read index.html ---
    const indexUri = vscode.Uri.joinPath(distUri, "index.html");
    let htmlBytes = await vscode.workspace.fs.readFile(indexUri);
    let html = new TextDecoder("utf-8").decode(htmlBytes);

    // --- Prepare base URL ---
    const baseUrl = webviewDistUri.toString() + "/";
    html = html.replaceAll("/__webview_base__/", baseUrl);

    // --- Process assets ---
    const assetsUri = vscode.Uri.joinPath(distUri, "assets");
    const assets = await vscode.workspace.fs.readDirectory(assetsUri);

    for (const [file, type] of assets) {
      if (type === vscode.FileType.File && /\.(css|js)$/.test(file)) {
        const fileUri = vscode.Uri.joinPath(assetsUri, file);
        let contentBytes = await vscode.workspace.fs.readFile(fileUri);
        let content = new TextDecoder("utf-8").decode(contentBytes);
        content = content.replaceAll("/__webview_base__/", baseUrl);
        await vscode.workspace.fs.writeFile(
          fileUri,
          new TextEncoder().encode(content)
        );
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
