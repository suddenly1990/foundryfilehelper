// SPDX-License-Identifier: MIT
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
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
