import * as vscode from "vscode";

export const startDevServerSuccess = (webview: vscode.WebviewView) => {
  webview.webview.postMessage({
    type: "start-dev-server-success",
  });
};

export const startDevServerError = (webview: vscode.WebviewView) => {
  webview.webview.postMessage({
    type: "start-dev-server-error",
  });
};

export const stopDevServerSuccess = (webview: vscode.WebviewView) => {
  webview.webview.postMessage({
    type: "stop-dev-server-success",
  });
};

export const stopDevServerError = (webview: vscode.WebviewView) => {
  webview.webview.postMessage({
    type: "stop-dev-server-error",
  });
};
