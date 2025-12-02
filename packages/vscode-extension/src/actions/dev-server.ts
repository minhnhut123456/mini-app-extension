import * as vscode from "vscode";

let server: any;

export const runDevServer = async ({
  port,
  onSuccess,
  onError,
}: {
  port: number;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri;
  if (!workspaceFolder) {
    return;
  }

  try {
    const vite = await import("vite");
    const { createServer } = vite;
    server = await createServer({
      mode: "development",
      configFile: false,
      root: workspaceFolder.fsPath,
      server: {
        port,
      },
    });

    await server.listen();
    server.printUrls();
    server.bindCLIShortcuts({ print: true });
    vscode.window.showInformationMessage(
      `Vite Server đã khởi động trên cổng 3001.`
    );
    onSuccess?.();
  } catch (error) {
    vscode.window.showErrorMessage(`Không thể khởi động Vite: ${error}`);
    onError?.();
  }
};

export const stopDevServer = async ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  try {
    await server?.close();
    onSuccess?.();
  } catch (error) {
    vscode.window.showErrorMessage(`Không thể dừng Vite: ${error}`);
    onError?.();
  }
};
