import * as vscode from "vscode";
import fs from "fs";
import path from "path";

const WebviewAppSettingKey = "webview-app-setting";

export class MainViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _extension: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extension.extensionUri],
    };

    //  Sidebar position
    const location = vscode.workspace
      .getConfiguration("workbench")
      .get("sideBar.location");

    const webviewAppState = this._extension.globalState.get(
      WebviewAppSettingKey,
      {
        language: "vi",
        guide: true,
      }
    );

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
    html = html.replaceAll(
      "__init_app_setting__",
      JSON.stringify({
        ...webviewAppState,
        sidebarPosition: location === "right" ? "right" : "left",
      })
    );

    // Handle messages from the webview
    webview.onDidReceiveMessage((message) => {
      switch (message.type) {
        case "set-setting":
          this._extension.globalState.update(
            WebviewAppSettingKey,
            message.payload
          );
          break;
        case "toggle-sidebar-position":
          vscode.commands.executeCommand(
            "workbench.action.toggleSidebarPosition"
          );
          break;
      }
    });

    webview.html = html;
  }
}
