export const DevChannels = {
  SIMULATOR: "simulator",
  CHROME_DEBUGGER: "chrome-debugger",
  EDGE_DEBUGGER: "edge-debugger",
  DEFAULT_BROWSER: "default-browser",
} as const;

export const Devices = {
  IP15: {
    // iPhone 15 / 15 Pro / 14 Pro
    key: "IP15",
    name: "iPhone 15 / iPhone 15 Pro / iPhone 14 Pro",
    width: 393,
    height: 852,
  },
  IP15PM: {
    // iPhone 15 Plus / 15 Pro Max / 14 Pro Max
    key: "IP15PM",
    name: "iPhone 15 Plus / iPhone 15 Pro Max / iPhone 14 Pro Max",
    width: 430,
    height: 932,
  },
  IP14: {
    // iPhone 14 / 13 / 13 Pro / 12 / 12 Pro
    key: "IP14",
    name: "iPhone 14 / iPhone 13 / iPhone 13 Pro / iPhone 12 / iPhone 12 Pro",
    width: 390,
    height: 844,
  },
  IP14PM: {
    // iPhone 14 Plus / 13 Pro Max / 12 Pro Max
    key: "IP14PM",
    name: "iPhone 14 Plus / iPhone 13 Pro Max / iPhone 12 Pro Max",
    width: 428,
    height: 926,
  },
  IPSE: {
    // SE 2022 / 2020 / 8 / 7 / 6s
    key: "IPSE",
    name: "iPhone SE 2022 / iPhone SE 2020 / iPhone 8 / iPhone 7 / iPhone 6s",
    width: 375,
    height: 667,
  },
  IP13Mini: {
    // 13 Mini / 12 Mini / 11 Pro / X / XS
    key: "IP13Mini",
    name: "iPhone 13 Mini / iPhone 12 Mini / iPhone 11 Pro / iPhone X / iPhone XS",
    width: 375,
    height: 812,
  },
  IP11: {
    // 11 / 11 Pro Max / XR / XS Max
    key: "IP11",
    // 11 / 11 Pro Max / XR / XS Max
    name: "iPhone 11 / iPhone 11 Pro Max / iPhone XR / iPhone XS Max",
    width: 414,
    height: 896,
  },
  IP8P: {
    // 8 Plus / 7 Plus / 6s Plus
    key: "IP8P",
    name: "iPhone 8 Plus / iPhone 7 Plus / iPhone 6s Plus",
    width: 414,
    height: 736,
  },
  IPSE1: {
    // iPhone SE (2016)
    key: "IPSE1",
    name: "iPhone SE",
    width: 320,
    height: 568,
  },

  PIX8: {
    // Pixel 8 / 7 / 7a / 6 / Galaxy S21 Ultra / S20 Ultra
    key: "PIX8",
    name: "Google Pixel 8 / Google Pixel 7 / Google Pixel 7a / Google Pixel 6 / Galaxy S21 Ultra / Galaxy S20 Ultra",
    width: 412,
    height: 915,
  },
  PIX8Pro: {
    key: "PIX8Pro",
    name: "Google Pixel 8 Pro",
    width: 440,
    height: 956,
  },
  PIX7Pro: {
    key: "PIX7Pro",
    name: "Google Pixel 7 Pro / Google Pixel 6 Pro",
    width: 412,
    height: 892,
  },
  PIX5: {
    key: "PIX5",
    name: "Google Pixel 5",
    width: 393,
    height: 851,
  },
  PIX4: {
    key: "PIX4",
    name: "Google Pixel 4",
    width: 411,
    height: 869,
  },
  PIX4XL: {
    key: "PIX4XL",
    name: "Google Pixel 4 XL",
    width: 411,
    height: 869,
  },
  PIX3: {
    key: "PIX3",
    name: "Google Pixel 3",
    width: 393,
    height: 786,
  },
  PIX3XL: {
    key: "PIX3XL",
    name: "Google Pixel 3 XL / Galaxy S9 Plus",
    width: 412,
    height: 847,
  },
  PIX3A: {
    key: "PIX3A",
    name: "Google Pixel 3A",
    width: 412,
    height: 846,
  },
  PIX3AXL: {
    key: "PIX3AXL",
    name: "Google Pixel 3A XL / Google Pixel 2 XL",
    width: 412,
    height: 823,
  },
  PIX2: {
    key: "PIX2",
    name: "Google Pixel 2 / Google Pixel / Google Pixel XL",
    width: 411,
    height: 731,
  },

  ZFold4Open: {
    key: "ZFold4Open",
    name: "Galaxy Z Fold4 (Open)",
    width: 673,
    height: 841,
  },
  ZFold4Closed: {
    key: "ZFold4Closed",
    name: "Galaxy Z Fold4 (Closed)",
    width: 280,
    height: 840,
  },

  GS22: {
    key: "GS22",
    name: "Galaxy S22",
    width: 412,
    height: 915,
  },
  GS22P: {
    key: "GS22P",
    name: "Galaxy S22 Plus",
    width: 450,
    height: 1000,
  },
  GS22U: {
    key: "GS22U",
    name: "Galaxy S22 Ultra",
    width: 450,
    height: 1000,
  },
  GS21: {
    key: "GS21",
    name: "Galaxy S21 / Galaxy S20",
    width: 412,
    height: 915,
  },
  GS21P: {
    key: "GS21P",
    name: "Galaxy S21 Plus / Galaxy S20 Plus",
    width: 412,
    height: 915,
  },
  GS9: {
    key: "GS9",
    name: "Galaxy S9 / Galaxy S8",
    width: 360,
    height: 740,
  },
  GS7: {
    key: "GS7",
    name: "Galaxy S7 / Galaxy S6 Edge / Galaxy S6",
    width: 360,
    height: 640,
  },
  GNote5: {
    key: "GNote5",
    name: "Galaxy Note 5",
    width: 480,
    height: 853,
  },
  LGG6: {
    key: "LGG6",
    name: "LG G6 / OnePlus 5t",
    width: 411,
    height: 822,
  },

  IPadMini4: {
    key: "IPadMini4",
    name: "iPad Mini 4 / iPad Pro 9",
    width: 768,
    height: 1024,
  },
  IPad10: {
    key: "IPad10",
    name: "iPad 10",
    width: 820,
    height: 1180,
  },
  IPadPro10: {
    key: "IPadPro10",
    name: "iPad Pro 10",
    width: 834,
    height: 1112,
  },
  IPadPro12: {
    key: "IPadPro12",
    name: "iPad Pro 12 / iPad Pro 12 (2021)",
    width: 1024,
    height: 1366,
  },
  IPadPro11: {
    key: "IPadPro11",
    name: "iPad Pro 11 (2021)",
    width: 834,
    height: 1194,
  },
} as const;
