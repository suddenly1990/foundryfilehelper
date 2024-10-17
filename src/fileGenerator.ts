import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

// 这个函数将文件监听和生成逻辑封装在一个函数中，供外部调用
export function setupFileWatcher(context: vscode.ExtensionContext) {
  console.log('Extension "auto-solidity-files" is now active!');

  // 监听 src 目录中的文件创建
  const watcher = vscode.workspace.createFileSystemWatcher("**/src/*.sol");

  watcher.onDidCreate((uri) => {
    console.log(`File created: ${uri.fsPath}`); // 打印文件路径
    const filename = path.basename(uri.fsPath, ".sol");
    console.log(`Base filename: ${filename}`); // 打印基础文件名
    const scriptFilename = `Deploy${capitalize(filename)}.s.sol`;
    const testFilename = `${capitalize(filename)}Test.t.sol`;

    console.log(`Script file: ${scriptFilename}, Test file: ${testFilename}`);

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

    console.log(`Script path: ${scriptPath}, Test path: ${testPath}`);

    // 创建对应的文件
    fs.writeFileSync(scriptPath, "// Auto-generated script file\n");
    fs.writeFileSync(testPath, "// Auto-generated test file\n");

    // 显示提示信息
    vscode.window.showInformationMessage(
      `Generated: ${scriptFilename} and ${testFilename}`
    );
  });
  context.subscriptions.push(watcher);
}

// 辅助函数：首字母大写
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
