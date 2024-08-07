import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("Missing GOOGLE_API_KEY environment variable");
}

const googleAI = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export { googleAI };
