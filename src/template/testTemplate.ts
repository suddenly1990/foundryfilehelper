import { capitalize } from "../utils";

export function getTestContent(filename: string): string {
  return `// SPDX-License-Identifier: MIT

import {Test} from "forge-std/Test.sol";
import {${capitalize(filename)}} from "../src/${capitalize(filename)}.sol";
import {Deploy${capitalize(filename)}} from "../script/Deploy${capitalize(
    filename
  )}.s.sol";

contract ${capitalize(filename)} Test is Test {
    ${capitalize(filename)} public contractInstance;
    Deploy${capitalize(filename)} public deployer;
    function setUp() public {
        deployer = new Deploy${capitalize(filename)}();
        contractInstance = deployer.run();

    }

    function testExample() public {
        // Add your test logic here
    }
}`;
}
