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
