// agents.ts
// 此模块是为了实例化各种不同的AI agent从而为后续的测试代码生成、检查、评估、优化等提供支持
import { AIConfig } from "./aiConfig";

interface LanguageModel {
  sendMessage(content: string): Promise<string>; // 修改此行以接受一个参数
  getModelInfo(): { name: string; version: string };
}

// BaseAgent: 共享的基础类
abstract class BaseAgent implements LanguageModel {
  protected config: AIConfig;
  protected agentName: string;

  constructor(config: AIConfig, agentName: string) {
    this.config = config;
    this.agentName = agentName;
  }

  async sendMessage(content: string): Promise<string> {
    const prompt = this.config.getPrompt(this.agentName);
    const response = await fetch(this.config.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.config.modelType,
        prompt: prompt,
        content: content,
        max_tokens: 150,
      }),
    });
    const result = (await response.json()) as { choices: { text: string }[] };
    return result.choices[0].text;
  }

  getModelInfo(): { name: string; version: string } {
    return {
      name: this.agentName,
      version: "v1.0",
    };
  }
}

// 1 WriteAgent: 负责生成单元测试代码
export class WriteAgent extends BaseAgent {
  constructor(config: AIConfig) {
    super(config, "WriteAgent");
  }
}

// 2 CheckAgent: 负责检查生成的代码是否有问题
export class CheckAgent extends BaseAgent {
  constructor(config: AIConfig) {
    super(config, "CheckAgent");
  }
}

// 3 EvaluationAgent: 负责评估测试代码是否符合标准
export class EvaluationAgent extends BaseAgent {
  constructor(config: AIConfig) {
    super(config, "EvaluationAgent");
  }
}

// 4 RefinementAgent: 根据评估反馈修改测试代码
export class RefinementAgent extends BaseAgent {
  constructor(config: AIConfig) {
    super(config, "RefinementAgent");
  }
}
