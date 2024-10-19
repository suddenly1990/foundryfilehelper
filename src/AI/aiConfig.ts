export class AIConfig {
  modelType: string;
  prompts: { [key: string]: string };
  apiKey: string;
  apiUrl: string;

  constructor(
    modelType: string,
    prompts: { [key: string]: string },
    apiKey: string,
    apiUrl: string
  ) {
    this.modelType = modelType;
    this.prompts = prompts;
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  getPrompt(agentName: string): string {
    return this.prompts[agentName] || "Default prompt";
  }
}
