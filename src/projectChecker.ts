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
