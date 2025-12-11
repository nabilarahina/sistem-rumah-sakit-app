import { GoogleGenAI } from "@google/genai";
import { AgentType, ChatMessage } from '../types';
import { SYSTEM_INSTRUCTIONS } from '../constants';

const apiKey = process.env.API_KEY || '';

// Initialize client only if key is present
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  currentMessage: string,
  agentType: AgentType
): Promise<string> => {
  if (!ai) {
    return "Error: API_KEY is missing. Please configure the environment.";
  }

  try {
    const modelId = 'gemini-2.5-flash'; 
    
    // Construct the prompt with history context
    // We strictly use the system instruction for the specific agent role
    const systemInstruction = SYSTEM_INSTRUCTIONS[agentType];

    // Convert internal history format to a simple string context for the model
    // (Simpler than maintaining full chat session objects for this prototype switch-logic)
    const conversationContext = history
      .slice(-10) // Keep last 10 messages for context window efficiency
      .map(msg => `${msg.role === 'user' ? 'User' : 'Agent'}: ${msg.content}`)
      .join('\n');

    const fullPrompt = `
      ${systemInstruction}

      Current Conversation History:
      ${conversationContext}

      User's New Input:
      ${currentMessage}
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: fullPrompt, 
      config: {
        temperature: 0.7, // Balanced creativity and accuracy
        maxOutputTokens: 500,
      }
    });

    return response.text || "I apologize, I could not generate a response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Error: Unable to connect to the AI model. Please try again later.";
  }
};
