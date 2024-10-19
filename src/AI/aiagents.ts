// agents.ts

interface LanguageModel {
  sendMessage(prompt: string): Promise<string>;
  getModelInfo(): { name: string; version: string };
}

// WriteAgent: 负责生成单元测试代码
export class WriteAgent implements LanguageModel {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(prompt: string): Promise<string> {
    const url = "https://api.openai.com/v1/completions";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 150,
      }),
    });
    const result = await response.json();
    return result.choices[0].text;
  }

  getModelInfo(): { name: string; version: string } {
    return {
      name: "WriteAgent",
      version: "v1.0",
    };
  }
}

// CheckAgent: 负责检查生成的代码是否有问题
export class CheckAgent implements LanguageModel {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(prompt: string): Promise<string> {
    const url = "https://api.openai.com/v1/completions";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 150,
      }),
    });
    const result = await response.json();
    return result.choices[0].text;
  }

  getModelInfo(): { name: string; version: string } {
    return {
      name: "CheckAgent",
      version: "v1.0",
    };
  }
}

// EvaluationAgent: 负责评估测试代码是否符合标准
export class EvaluationAgent implements LanguageModel {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(prompt: string): Promise<string> {
    const url = "https://api.openai.com/v1/completions";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 150,
      }),
    });
    const result = await response.json();
    return result.choices[0].text;
  }

  getModelInfo(): { name: string; version: string } {
    return {
      name: "EvaluationAgent",
      version: "v1.0",
    };
  }
}

// RefinementAgent: 根据评估反馈修改测试代码
export class RefinementAgent implements LanguageModel {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(prompt: string): Promise<string> {
    const url = "https://api.openai.com/v1/completions";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 150,
      }),
    });
    const result = await response.json();
    return result.choices[0].text;
  }

  getModelInfo(): { name: string; version: string } {
    return {
      name: "RefinementAgent",
      version: "v1.0",
    };
  }
}
