import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const runGeminiPrompt = async (prompt) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
