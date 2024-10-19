import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { capitalize } from "./utils";

// 检查当前选中文件的对应文件是否存在
export function checkCorrespondingFile() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No file is currently open.");
    return;
  }

  const currentFilePath = editor.document.fileName;
  const currentFileName = path.basename(currentFilePath, ".sol");
  const currentDir = path.dirname(currentFilePath);

  let correspondingFilePath: string;

  if (currentDir.includes("script")) {
    // 当前文件在 script 目录中，检查 test 目录
    const testFileName = `${capitalize(currentFileName)}Test.sol`;
    correspondingFilePath = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      "test",
      testFileName
    );
  } else if (currentDir.includes("test")) {
    // 当前文件在 test 目录中，检查 script 目录
    const scriptFileName = `${currentFileName.replace("Test", "")}.sol`;
    correspondingFilePath = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      "script",
      scriptFileName
    );
  } else {
    return;
  }
  // 检查对应文件是否存在，并显示相应的消息
}
