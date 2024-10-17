import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import { getScriptContent } from "./template/scriptTemplate"; // 从 scriptTemplate.ts 导入
import { capitalize } from "./utils"; // 从 utils.ts 导入
import { getTestContent } from "./template/testTemplate"; // 从 testTemplate.ts 导入
import { getMakefileContent } from "./template/makefileTemplate"; // 从 makefileTemplate.ts 导入
import { getEnvContent } from "./template/envTemplate";
import { getSelfContent } from "./template/selfTemplate";

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
    const selfFilename = `${capitalize(filename)}.sol`;
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
    const selfPath = path.join(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      "src",
      selfFilename
    );

    // 使用从 scriptTemplate.ts 导入的模板内容
    const scriptContent = getScriptContent(filename);
    const testContent = getTestContent(filename);
    const selfContent = getSelfContent(filename);

    fs.writeFileSync(scriptPath, scriptContent);
    fs.writeFileSync(testPath, testContent);
    fs.writeFileSync(selfPath, selfContent);
    // 显示提示信息
    vscode.window.showInformationMessage(
      `Generated: ${scriptFilename} and ${testFilename}`
    );
  });

  context.subscriptions.push(watcher);
}

// 这个函数用于生成 Makefile，完全独立于监听逻辑
export function setupMakefileCommand(context: vscode.ExtensionContext) {
  const createMakefileCommand = vscode.commands.registerCommand(
    "foundryfilehelper.createMakefile",
    async () => {
      const makefilePath = path.join(
        vscode.workspace.workspaceFolders![0].uri.fsPath,
        "Makefile"
      );

      // 检查 Makefile 是否已经存在
      if (fs.existsSync(makefilePath)) {
        // 弹出提示框，询问是否覆盖
        const userChoice = await vscode.window.showWarningMessage(
          "Makefile already exists. Do you want to overwrite it?",
          { modal: true }, // 让弹窗变为模态窗口，强制用户做出选择
          "Yes", // 提供 Yes 选项
          "No" // 提供 No 选项
        );

        // 如果用户选择 No，则直接返回，不执行覆盖操作
        if (userChoice !== "Yes") {
          vscode.window.showInformationMessage("Makefile creation canceled.");
          return;
        }
      }

      // 如果用户选择了覆盖或文件不存在，生成 Makefile
      const makefileContent = getMakefileContent();
      fs.writeFileSync(makefilePath, makefileContent);
      vscode.window.showInformationMessage("Makefile created successfully!");
    }
  );

  context.subscriptions.push(createMakefileCommand);
}

// 这个函数用于生成 .env 文件
export function setupEnvFileCommand(context: vscode.ExtensionContext) {
  const createEnvFileCommand = vscode.commands.registerCommand(
    "foundryfilehelper.createEnvFile",
    async () => {
      const envFilePath = path.join(
        vscode.workspace.workspaceFolders![0].uri.fsPath,
        ".env"
      );

      // 检查 .env 文件是否已经存在
      if (fs.existsSync(envFilePath)) {
        // 弹出提示框，询问是否覆盖
        const userChoice = await vscode.window.showWarningMessage(
          ".env file already exists. Do you want to overwrite it?",
          { modal: true }, // 让弹窗变为模态窗口，强制用户做出选择
          "Yes", // 提供 Yes 选项
          "No" // 提供 No 选项
        );

        // 如果用户选择 No，则直接返回，不执行覆盖操作
        if (userChoice !== "Yes") {
          vscode.window.showInformationMessage(".env file creation canceled.");
          return;
        }
      }

      // 如果用户选择了覆盖或文件不存在，生成 .env 文件
      const envFileContent = getEnvContent();
      fs.writeFileSync(envFilePath, envFileContent);
      vscode.window.showInformationMessage(".env file created successfully!");
    }
  );

  context.subscriptions.push(createEnvFileCommand);
}
