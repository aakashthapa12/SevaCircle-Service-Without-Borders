import { Router } from 'express';
import { getChatResponse, getSuggestions } from '../services/groq.js';
import { getDB } from '../database.js';
import { z } from 'zod';

const router = Router();

const chatRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  conversationHistory: z.array(z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string(),
  })).optional().default([]),
});

// POST /api/chat - Send a message to AI chatbot
router.post('/', async (req, res) => {
  try {
    const { message, conversationHistory } = chatRequestSchema.parse(req.body);

    // Get context from database
    const db = getDB();
    const services = db.data.services || [];
    const workers = db.data.workers || [];

    // Get AI response
    const aiResponse = await getChatResponse(
      message,
      conversationHistory,
      { services, workers }
    );

    // Get follow-up suggestions
    const suggestions = await getSuggestions(message, { services, workers });

    res.json({
      success: true,
      data: {
        response: aiResponse,
        suggestions,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request format',
        details: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process chat message',
    });
  }
});

// GET /api/chat/welcome - Get welcome message with context
router.get('/welcome', async (req, res) => {
  try {
    const db = getDB();
    const servicesCount = db.data.services?.length || 0;
    const workersCount = db.data.workers?.length || 0;

    const welcomeMessage = `👋 Hello! I'm your SevaCircle AI Assistant. I'm here to help you find the perfect service provider for your needs.

We currently have ${servicesCount} services available with ${workersCount} verified professionals ready to help you.

How can I assist you today?`;

    const suggestions = [
      '🔍 What services do you offer?',
      '⭐ Show me top-rated workers',
      '📅 How do I book a service?',
      '💰 Tell me about pricing',
    ];

    res.json({
      success: true,
      data: {
        message: welcomeMessage,
        suggestions,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get welcome message',
    });
  }
});

export default router;
