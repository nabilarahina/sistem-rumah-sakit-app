import { GoogleGenAI } from "@google/genai";
import { AgentType, ChatMessage } from '../types';
import { SYSTEM_INSTRUCTIONS } from '../constants';

const apiKey = process.env.API_KEY || '';

// Initialize client only if key is present
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

interface GeminiResponse {
  text: string;
  sources?: Array<{ title: string; uri: string }>;
}

export const sendMessageToGemini = async (
  history: ChatMessage[],
  currentMessage: string,
  agentType: AgentType
): Promise<GeminiResponse> => {
  if (!ai) {
    return { text: "Error: API_KEY is missing. Please configure the environment." };
  }

  try {
    const modelId = 'gemini-2.5-flash'; 
    
    const systemInstruction = SYSTEM_INSTRUCTIONS[agentType];

    const conversationContext = history
      .slice(-10) 
      .map(msg => `${msg.role === 'user' ? 'User' : 'Agent'}: ${msg.content}`)
      .join('\n');

    const fullPrompt = `
      ${systemInstruction}

      Current Conversation History:
      ${conversationContext}

      User's New Input:
      ${currentMessage}
    `;

    // Enable Google Search only for MIA agent
    const tools = agentType === AgentType.MIA ? [{ googleSearch: {} }] : undefined;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: fullPrompt, 
      config: {
        temperature: 0.7, 
        maxOutputTokens: 500,
        tools: tools,
      }
    });

    const text = response.text || "I apologize, I could not generate a response.";
    
    // Extract grounding sources if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    let sources: Array<{ title: string; uri: string }> | undefined;

    if (groundingChunks) {
      sources = groundingChunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri && web.title)
        .map((web: any) => ({ title: web.title, uri: web.uri }));
    }

    return { text, sources };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "System Error: Unable to connect to the AI model. Please try again later." };
  }
};