import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { capitalize } from "./utils";

export function setupFileDeletionWatcher(context: vscode.ExtensionContext) {
  // 监听文件删除事件
  const deleteWatcher =
    vscode.workspace.createFileSystemWatcher("**/src/*.sol");

  deleteWatcher.onDidDelete(async (uri) => {
    const filename = path.basename(uri.fsPath, ".sol");
    const scriptFilename = `Deploy${capitalize(filename)}.s.sol`;
    const testFilename = `${capitalize(filename)}Test.t.sol`;
    const selfFilename = `${capitalize(filename)}.sol`;

    const scriptPath = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      "script",
      scriptFilename
    );
    const testPath = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      "test",
      testFilename
    );
    const selfPath = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      "src",
      selfFilename
    );

    const userChoice = await vscode.window.showWarningMessage(
      `Do you want to delete the related files: ${scriptFilename}, ${testFilename}, and ${selfFilename}?`,
      { modal: true },
      "Yes",
      "No"
    );

    if (userChoice === "Yes") {
      [scriptPath, testPath, selfPath].forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
      vscode.window.showInformationMessage(
        "Related files deleted successfully."
      );
    }
  });

  context.subscriptions.push(deleteWatcher);
}
