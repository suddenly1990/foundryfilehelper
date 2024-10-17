import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// 检查项目是否为 Foundry 项目
export function isFoundryProject(): boolean {
  const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

  if (!workspacePath) {
    return false;
  }

  // 检查是否存在 .sol 文件
  const srcDir = path.join(workspacePath, "src");
  if (!fs.existsSync(srcDir)) {
    return false;
  }

  const solFiles = fs
    .readdirSync(srcDir)
    .filter((file) => file.endsWith(".sol"));

  return solFiles.length > 0;
}

// 检查项目是否使用了 Foundry
export function isUsingFoundry(): boolean {
  const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

  if (!workspacePath) {
    return false;
  }

  // 检查是否存在 foundry.toml 文件
  const foundryConfigPath = path.join(workspacePath, "foundry.toml");
  return fs.existsSync(foundryConfigPath);
}
