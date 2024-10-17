import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// 检查项目是否为 Solidity 项目
export function isSolidityProject(): boolean {
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

// 检查给定的文件是否存在
export function doesFileExist(filePath: string): boolean {
  try {
    return fs.existsSync(filePath); // 使用 fs.existsSync 方法检查文件是否存在
  } catch (err) {
    console.error(`Error checking file existence: ${err}`);
    return false; // 如果有错误，返回 false
  }
}
