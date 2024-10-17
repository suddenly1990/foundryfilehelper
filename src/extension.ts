import * as vscode from "vscode";
import {
  setupFileWatcher,
  setupMakefileCommand,
  setupEnvFileCommand,
} from "./fileGenerator"; // 引入文件生成模块
import { isSolidityProject, isUsingFoundry } from "./projectChecker";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  //   // 如果不是 Solidity 项目或者没有使用 Foundry，就不执行任何操作
  if (!isSolidityProject() || !isUsingFoundry()) {
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
}

// This method is called when your extension is deactivated
export function deactivate() {}
