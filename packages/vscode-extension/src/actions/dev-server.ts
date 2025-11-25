import * as vscode from "vscode";

let server: any;

export const runDevServer = async () => {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri;
  if (!workspaceFolder) {
    return;
  }

  try {
    const vite = await import("vite");
    const { createServer } = vite;
    // 3. Sử dụng API Vite
    server = await createServer({
      mode: "development",
      configFile: false,
      root: workspaceFolder.fsPath,
      server: {
        port: 3001, // Cổng bạn đã cấu hình
      },
    });

    await server.listen();
    server.printUrls();
    server.bindCLIShortcuts({ print: true });
    vscode.window.showInformationMessage(
      `Vite Server đã khởi động trên cổng 3001.`
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      `Không thể khởi động Vite: ${(error as any).message}`
    );
  }
};

export const stopDevServer = () => {
  server?.close();
};
