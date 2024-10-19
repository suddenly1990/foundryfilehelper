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

import {
  WriteAgent,
  CheckAgent,
  EvaluationAgent,
  RefinementAgent,
} from "./aiUnitTestAgents";
import { AIConfig, AGENT_NAMES } from "./aiConfig";

export class AIUnitTestAgentPipeline {
  private writeAgent: WriteAgent;
  private checkAgent: CheckAgent;
  private evaluationAgent: EvaluationAgent;
  private refinementAgent: RefinementAgent;

  constructor(configs: { [key: string]: AIConfig }) {
    this.writeAgent = new WriteAgent(configs[AGENT_NAMES.WRITE]);
    this.checkAgent = new CheckAgent(configs[AGENT_NAMES.CHECK]);
    this.evaluationAgent = new EvaluationAgent(configs[AGENT_NAMES.EVALUATION]);
    this.refinementAgent = new RefinementAgent(configs[AGENT_NAMES.REFINEMENT]);
  }

  // 链式调用各个代理的功能
  async execute(sourceCodeContent: string): Promise<string> {
    try {
      console.log("Starting WriteAgent...");
      const generatedCode = await this.writeAgent.sendMessage(
        sourceCodeContent
      );
      console.log("Generated Code:", generatedCode);

      console.log("Starting CheckAgent...");
      const checkResult = await this.checkAgent.sendMessage(generatedCode);
      console.log("Check Result:", checkResult);

      console.log("Starting EvaluationAgent...");
      const evaluationResult = await this.evaluationAgent.sendMessage(
        checkResult
      );
      console.log("Evaluation Result:", evaluationResult);

      console.log("Starting RefinementAgent...");
      const refinedCode = await this.refinementAgent.sendMessage(
        evaluationResult
      );
      console.log("Refined Code:", refinedCode);

      // 返回最终的 refinedCode
      return refinedCode;
    } catch (error) {
      console.error("Error in agent execution:", error);
      throw error; // 重新抛出错误以便调用者处理
    }
  }
}
