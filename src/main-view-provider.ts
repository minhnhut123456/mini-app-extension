import * as vscode from "vscode";
import fs from "fs";
import path from "path";

export class MainViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    const webview = webviewView.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    const distUri = vscode.Uri.joinPath(
      this._extensionUri,
      "packages",
      "main-view",
      "dist"
    );
    const webviewDistUri = webview.asWebviewUri(distUri);

    let html = fs.readFileSync(path.join(distUri.fsPath, "index.html"), "utf8");

    // Replace place holder base path in dist files
    const baseUrl = webviewDistUri.toString() + "/";
    html = html.replaceAll("/__vscode_webview_base__/", baseUrl);

    const files = fs.readdirSync(path.join(distUri.fsPath, "assets"));
    for (const file of files) {
      if (/\.(css|js)$/.test(file)) {
        const filePath = path.join(distUri.fsPath, "assets", file);
        let content = fs.readFileSync(filePath, "utf8");
        content = content.replaceAll("/__vscode_webview_base__/", baseUrl);
        fs.writeFileSync(filePath, content, "utf8");
      }
    }

    webview.html = html;
  }
}
