import { AIConfig } from "./aiConfig";
import {
  WriteAgent,
  CheckAgent,
  EvaluationAgent,
  RefinementAgent,
} from "./aiUnitTestAgents";

export class AIUnitTestAgentManager {
  private writeAgent: WriteAgent;
  private checkAgent: CheckAgent;
  private evaluationAgent: EvaluationAgent;
  private refinementAgent: RefinementAgent;

  constructor(config: AIConfig) {
    this.writeAgent = new WriteAgent(config);
    this.checkAgent = new CheckAgent(config);
    this.evaluationAgent = new EvaluationAgent(config);
    this.refinementAgent = new RefinementAgent(config);
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
