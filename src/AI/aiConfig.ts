export class AIConfig {
  modelType: string;
  prompt: string;

  constructor(modelType: string, prompt: string) {
    this.modelType = modelType;
    this.prompt = prompt;
  }
}
