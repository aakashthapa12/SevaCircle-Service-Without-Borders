import Groq from 'groq-sdk';

// Lazy initialization to ensure env vars are loaded
let groqInstance: Groq | null = null;

function getGroqClient(): Groq {
  if (!groqInstance) {
    groqInstance = new Groq({
      apiKey: process.env.GROQ_API_KEY || '',
    });
  }
  return groqInstance;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatContext {
  services: any[];
  workers: any[];
  userBookings?: any[];
}

const SYSTEM_PROMPT = `You are SevaCircle AI Assistant, a helpful and friendly customer support chatbot for a local services booking platform.

Your role:
- Help users find the right service providers (plumbers, electricians, cleaners, etc.)
- Answer questions about services, pricing, and booking process
- Provide information about available workers and their expertise
- Assist with booking-related queries
- Be conversational, helpful, and professional

Guidelines:
- Keep responses concise and helpful
- Use the provided context about services and workers to give accurate information
- If asked about specific pricing, refer to the service cards or suggest contacting workers
- Encourage users to book through the platform
- If you don't know something, admit it politely and suggest alternatives

Available Services Context will be provided in each request.`;

export async function getChatResponse(
  userMessage: string,
  conversationHistory: ChatMessage[],
  context: ChatContext
): Promise<string> {
  try {
    // Build context string from available data
    const servicesContext = context.services
      .map(s => `- ${s.name}: ${s.description} (Category: ${s.category})`)
      .join('\n');

    const workersContext = context.workers
      .slice(0, 5) // Top 5 workers
      .map(w => `- ${w.name}: ${w.experience} years experience, Rating: ${w.rating}/5, Specialization: ${w.specialization || 'General'}`)
      .join('\n');

    const contextPrompt = `
Current Platform Data:

SERVICES AVAILABLE:
${servicesContext}

TOP WORKERS:
${workersContext}

User Question: ${userMessage}

Please provide a helpful response based on this context.`;

    // Prepare messages for Groq API
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-5), // Keep last 5 messages for context
      { role: 'user', content: contextPrompt },
    ];

    const groq = getGroqClient();
    const chatCompletion = await groq.chat.completions.create({
      messages: messages as any,
      model: 'llama-3.3-70b-versatile', // Updated to current model
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9,
    });

    return chatCompletion.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';
  } catch (error: any) {
    console.error('Groq API Error:', error);
    
    if (error?.status === 401) {
      throw new Error('Invalid Groq API key. Please check your configuration.');
    }
    
    throw new Error('Failed to get AI response. Please try again later.');
  }
}

export async function getSuggestions(userInput: string, context: ChatContext): Promise<string[]> {
  try {
    const prompt = `Based on user input: "${userInput}"
Available services: ${context.services.map(s => s.name).join(', ')}

Generate 3 short, helpful follow-up suggestions or questions the user might want to ask.
Format: Return only a JSON array of strings, no other text.
Example: ["How much does it cost?", "Who are the top-rated plumbers?", "How do I book a service?"]`;

    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant', // Faster model for quick suggestions
      temperature: 0.8,
      max_tokens: 150,
    });

    const response = completion.choices[0]?.message?.content || '[]';
    
    try {
      const suggestions = JSON.parse(response);
      return Array.isArray(suggestions) ? suggestions.slice(0, 3) : [];
    } catch {
      // Fallback suggestions if parsing fails
      return [
        'What services do you offer?',
        'How do I book a service?',
        'Who are the top-rated workers?',
      ];
    }
  } catch (error) {
    console.error('Suggestions Error:', error);
    return [
      'Tell me about your services',
      'How does booking work?',
      'Show me available workers',
    ];
  }
}
