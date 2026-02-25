import { GoogleGenAI, Type } from "@google/genai";
import { Quote, QuoteTone } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateQuote(keyword: string, tone: QuoteTone): Promise<Quote> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a ${tone} motivational quote related to "${keyword}".`,
    config: {
      systemInstruction: `You are a world-class copywriter and philosopher. 
      Create a quote that is impactful, original, and fits the requested tone perfectly.
      - Inspirational: Uplifting, powerful, visionary.
      - Humorous: Witty, self-deprecating, or observational but still motivational.
      - Serious: Stoic, deep, grounded in reality.
      - Philosophical: Abstract, questioning, profound.
      - Brutalist: Raw, direct, no-nonsense, harsh but true.
      
      Return the result in JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "The quote text itself." },
          author: { type: Type.STRING, description: "A fictional or real-sounding author name that fits the vibe." },
          context: { type: Type.STRING, description: "A brief 3-5 word context or sub-label for the quote." }
        },
        required: ["text", "author"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}') as Quote;
  } catch (e) {
    console.error("Failed to parse quote response", e);
    return {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
      context: "On Strategy"
    };
  }
}
