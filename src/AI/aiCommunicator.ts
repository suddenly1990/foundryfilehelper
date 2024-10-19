import axios from "axios";

export class AICommunicator {
  private apiKey: string;
  private apiUrl: string;

  constructor(
    apiKey: string,
    apiUrl: string = "https://api.openai.com/v1/engines/davinci-codex/completions"
  ) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  // 发送请求到大模型并获取响应
  async communicate(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        return response.data.choices[0].text.trim();
      } else {
        throw new Error("Invalid response from AI model");
      }
    } catch (error) {
      console.error("Error communicating with AI model:", error);
      throw error;
    }
  }
}
