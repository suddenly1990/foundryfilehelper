import * as fs from "fs";
import * as path from "path";
// 辅助函数：首字母大写
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function readFileContent(filePath: string): void {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`无法读取文件: ${err.message}`);
      return;
    }
    console.log(`文件内容:\n${data}`);
  });
}
