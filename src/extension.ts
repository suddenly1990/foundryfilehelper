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
import {
  setupFileWatcher,
  setupMakefileCommand,
  setupEnvFileCommand,
} from "./fileGenerator"; // 引入文件生成模块
import { isFoundryProject, isUsingFoundry } from "./projectChecker";
import { setupFileDeletionWatcher } from "./fileDeletionWatcher";
import { checkCorrespondingFile } from "./fileChecker"; // 导入文件检查器

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  //   // 如果不是 Solidity 项目或者没有使用 Foundry，就不执行任何操作
  if (!isFoundryProject() || !isUsingFoundry()) {
    return;
  }

  console.log(
    'Congratulations, your extension "foundryfilehelper" is now active!'
  );

  // 调用 setupFileWatcher 函数以设置文件监听器和命令
  setupFileWatcher(context);

  // 注册生成 Makefile 的独立命令
  setupMakefileCommand(context);

  // 注册创建 Makefile 的命令
  setupEnvFileCommand(context);

  setupFileDeletionWatcher(context);

  // // 注册检查对应文件的命令
  // const checkFileCommand = vscode.commands.registerCommand(
  //   "extension.checkCorrespondingFile",
  //   () => {
  //     checkCorrespondingFile();
  //   }
  // );

  // context.subscriptions.push(checkFileCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
