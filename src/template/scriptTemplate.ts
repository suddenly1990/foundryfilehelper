import { capitalize } from "../utils";

export function getScriptContent(filename: string): string {
  return `// SPDX-License-Identifier: MIT

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {${capitalize(filename)}} from "../src/${capitalize(filename)}.sol";

pragma solidity ^0.8.26;

contract Deploy${capitalize(filename)} is Script {
    function run() external returns (${capitalize(filename)}) {
        vm.startBroadcast();
        ${capitalize(filename)} constract = new ${capitalize(filename)}();
        console2.log(" contract address", address(constract));
        vm.stopBroadcast();
        return constract;
    }
}`;
}
