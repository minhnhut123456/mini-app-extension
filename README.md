# 🚀 Mini App Extension



## Introduction

Welcome to **Mini App Extension*!

This is a powerful **VS Code Editor Extension** specifically designed to simplify and accelerate the development workflow for **Mini Applications** (such as Zalo Mini App, etc.).

Instead of relying on external command-line tools, this Extension integrates all necessary features directly into the familiar **Visual Studio Code** environment, providing an optimal editing and debugging experience.

---

## ✨ Key Features

This Extension focuses on providing a cohesive and efficient development environment:

* **Integrated Editor Tools:** Provides advanced editing features (e.g., specific syntax highlighting, intelligent code completion) tailored for the Mini App structure and APIs.
* **Visual Interface (Webview):** Integrates a visual User Interface (UI) within the sidebar (Activity Bar) or a dedicated panel for project management, configuration, and previewing Mini App components.
* **Streamlined Build and Deploy:** Integrates quick commands to build (compile), package, and deploy your Mini App directly from the VS Code Terminal.
* **Project Scaffolding:** Easily initialize and manage the required file structure, directories, and configuration settings for a new Mini App project.

---

## 🎯 Current Focus

The current focus of this Extension is to support and optimize the development process primarily within the **VS Code platform**.

We are committed to delivering a stable and robust tool for Mini App developers, helping to shorten the time from initial idea to final deployed product.

---

## 💻 Installation Guide

1.  **Install VS Code:** Ensure you have Visual Studio Code installed on your machine.
2.  **Install the Extension:**
    * Search for **Mini App Extension** on the VS Code Marketplace.
    * Alternatively, install directly from a built `.vsix` file found in this repository.
3.  **Restart VS Code.**
4.  The Extension will appear in your Activity Bar.

---

## 🛠️ Technology & Structure

This project is built on a **Monorepo** structure utilizing **Yarn Workspaces** to manage its components:

* **Extension Host:** The core Extension source code (written in TypeScript) that handles communication with the VS Code API.
* **Webview UI (Mini App Tool UI):** The user interface built using **React/Vue/etc.** to provide the visual editing experience.
* **Build Tools:** Uses **Esbuild/Webpack** for efficient code bundling and optimization.

---

## 🤝 Contributing

We welcome all contributions! If you find a bug or have a feature suggestion, please feel free to create an **Issue** or submit a **Pull Request** directly.
