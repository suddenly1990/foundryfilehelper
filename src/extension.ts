import * as vscode from "vscode";
import { setupFileWatcher } from "./fileGenerator"; // 引入文件生成模块
import { isSolidityProject, isUsingFoundry } from "./projectChecker"; // 引入项目检查模块

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

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "foundryfilehelper.generateFiles",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      // vscode.window.showInformationMessage(
      //   "Hello World from FoundryFileHelper!"
      // );
    }
  );

  context.subscriptions.push(disposable);
  setupFileWatcher(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
