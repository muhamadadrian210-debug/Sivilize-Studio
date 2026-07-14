import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '@/lib/env'

const apiKey = env.GEMINI_API_KEY

// Initialize the Google Generative AI SDK
export const genAI = new GoogleGenerativeAI(apiKey)

// Define commonly used models as constants
export const AI_MODELS = {
  TEXT: 'gemini-2.5-flash', // Fast, standard reasoning (default)
  TEXT_PRO: 'gemini-2.5-pro', // Complex reasoning, higher rate limits
  VISION: 'gemini-2.5-flash', // Supports multi-modal vision natively
  EMBEDDING: 'text-embedding-004', // Standard 768-dim embedding model
} as const
