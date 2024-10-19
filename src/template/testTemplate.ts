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

import { capitalize } from "../utils";

export function getTestContent(filename: string): string {
  return `// SPDX-License-Identifier: MIT

import {Test} from "forge-std/Test.sol";
import {${capitalize(filename)}} from "../src/${capitalize(filename)}.sol";
import {Deploy${capitalize(filename)}} from "../script/Deploy${capitalize(
    filename
  )}.s.sol";

pragma solidity ^0.8.26;

contract ${capitalize(filename)}Test is Test {
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
