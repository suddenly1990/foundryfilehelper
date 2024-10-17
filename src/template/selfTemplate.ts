import { capitalize } from "../utils";

export function getSelfContent(filename: string): string {
  return `// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

contract ${capitalize(filename)} {
    // Add your contract logic here
}`;
}
