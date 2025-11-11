export let vscodeApi: VsCodeApi;
export const initVscodeApi = () => {
  vscodeApi = window?.acquireVsCodeApi?.();
};
