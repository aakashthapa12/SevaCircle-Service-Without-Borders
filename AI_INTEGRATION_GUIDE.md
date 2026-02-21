# 🤖 AI Chatbot Integration Guide

## Overview
Your SevaCircle platform now includes an **AI-powered chatbot** using **Groq API** with **Llama 3.1** models. This provides intelligent customer support, service recommendations, and booking assistance.

## 🎯 What's Been Added

### Backend Components

1. **Groq Service** (`server/src/services/groq.ts`)
   - Integration with Groq SDK
   - Uses Llama 3.1 70B model for main conversations
   - Uses Llama 3.1 8B Instant for quick suggestions
   - Context-aware responses using platform data (services, workers)
   - Conversation history tracking

2. **Chat API Routes** (`server/src/routes/chat.ts`)
   - `POST /api/chat` - Send messages to chatbot
   - `GET /api/chat/welcome` - Get welcome message with suggestions

3. **Environment Variables**
   - Added `GROQ_API_KEY` configuration
   - Created `.env.example` template

### Frontend Components

1. **Chat Page** (`client/src/pages/Chat.tsx`)
   - Beautiful gradient UI with message bubbles
   - Real-time conversation with AI
   - Loading states and animations
   - Smart suggestion chips
   - Auto-scroll to latest message
   - Timestamps for all messages

2. **Navigation Update**
   - Added "AI Chat" link in navbar with MessageCircle icon
   - Accessible from all pages

## 🚀 Setup Instructions

### Step 1: Get Groq API Key

1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign up for a free account (if you don't have one)
3. Create a new API key
4. Copy the API key

### Step 2: Configure Environment

1. Navigate to `server` directory
2. Create a `.env` file (if it doesn't exist):
   ```bash
   cp .env.example .env
   ```

3. Add your Groq API key to `.env`:
   ```env
   PORT=3001
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   GROQ_API_KEY=gsk_your_actual_groq_api_key_here
   ```

### Step 3: Install Dependencies

```bash
cd server
npm install
```

This will install the new `groq-sdk` package.

### Step 4: Restart the Server

```bash
npm run dev
```

The server should restart with AI chat functionality enabled.

## 🎮 How to Use

### For Users

1. Navigate to **AI Chat** in the navbar
2. You'll see a welcome message with suggestions
3. Click on suggestions OR type your own questions
4. The AI will respond with helpful information about:
   - Available services and workers
   - Booking process
   - Pricing information
   - Service recommendations
   - General platform help

### Example Questions to Try

- "What services do you offer?"
- "Show me the best-rated plumbers"
- "How does the booking process work?"
- "Tell me about your electricians"
- "What's the average cost for home cleaning?"
- "Who are the most experienced workers?"

## 🧠 AI Capabilities

### What the AI Can Do

1. **Service Discovery**
   - Recommend services based on user needs
   - Explain service categories and offerings
   - Compare different services

2. **Worker Information**
   - Share details about available workers
   - Provide ratings and experience information
   - Suggest top-rated professionals

3. **Booking Assistance**
   - Explain the booking process
   - Answer questions about scheduling
   - Provide pricing guidelines

4. **Customer Support**
   - Answer general platform questions
   - Help with navigation
   - Provide tips and best practices

### Context Awareness

The AI has access to:
- All available services (names, descriptions, categories)
- Top workers (names, ratings, experience, specializations)
- User's booking history (if logged in)

### Smart Features

1. **Conversation Memory** - Remembers last 5 messages for context
2. **Quick Suggestions** - Generates 3 follow-up questions after each response
3. **Welcome Message** - Dynamic welcome with current platform stats
4. **Error Handling** - Graceful fallbacks if API fails

## 🎨 UI Features

- **Gradient Design** - Modern blue-to-purple theme
- **Message Bubbles** - Different colors for user/AI
- **Icons** - Bot and User icons for easy identification
- **Loading Animation** - Spinner while AI is thinking
- **Suggestion Chips** - Clickable quick responses
- **Auto-scroll** - Always see the latest message
- **Timestamps** - Track conversation flow

## 🔧 Technical Details

### Models Used

1. **llama-3.1-70b-versatile**
   - Main conversation model
   - 70 billion parameters
   - Excellent for detailed, contextual responses
   - Temperature: 0.7 (balanced creativity/accuracy)

2. **llama-3.1-8b-instant**
   - Quick suggestions generation
   - 8 billion parameters
   - Ultra-fast response time
   - Temperature: 0.8 (more creative suggestions)

### API Endpoints

#### POST /api/chat
```typescript
Request:
{
  "message": "What services do you offer?",
  "conversationHistory": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}

Response:
{
  "success": true,
  "data": {
    "response": "We offer various services including...",
    "suggestions": ["Tell me more about...", "How much does...", "Who are..."],
    "timestamp": "2024-02-21T10:30:00.000Z"
  }
}
```

#### GET /api/chat/welcome
```typescript
Response:
{
  "success": true,
  "data": {
    "message": "👋 Hello! I'm your SevaCircle AI Assistant...",
    "suggestions": ["🔍 What services...", "⭐ Show me top-rated...", ...]
  }
}
```

## 💰 Groq API Pricing

- **Free Tier**: Generous limits for development
- **Very Fast**: Responses typically under 1 second
- **Cost-Effective**: Much cheaper than OpenAI
- **No Credit Card Required** for trial

## 🔒 Security & Privacy

- API key stored securely in `.env` file
- Never exposed to frontend
- Conversation history limited to 5 messages
- No personal data sent to Groq (only platform context)

## 🐛 Troubleshooting

### API Key Issues

**Error**: "Invalid Groq API key"
- Double-check your API key in `.env`
- Ensure no extra spaces or quotes
- Verify key is active in Groq Console

### Rate Limiting

**Error**: "Failed to get AI response"
- Wait a few seconds and try again
- Check Groq Console for rate limit status
- Consider upgrading plan if hitting limits

### Model Not Responding

- Check server logs for detailed error messages
- Verify internet connection
- Ensure Groq API status is operational

## 🚀 Future Enhancements

Potential improvements you can add:

1. **Booking Integration** - Let AI create bookings directly
2. **Voice Input** - Add speech-to-text
3. **Multi-language** - Support multiple languages
4. **Sentiment Analysis** - Detect user satisfaction
5. **Admin Analytics** - Track common questions
6. **Personalized Responses** - Use user profile data
7. **Image Understanding** - Upload images for context

## 📊 Monitoring

Track these metrics:
- Average response time
- Most asked questions
- Conversation success rate
- User satisfaction
- Popular services requested

## 🎓 Best Practices

1. **Keep API Key Secret** - Never commit `.env` to git
2. **Monitor Usage** - Check Groq dashboard regularly
3. **Update System Prompt** - Improve AI responses over time
4. **Test Edge Cases** - Handle unusual questions gracefully
5. **User Feedback** - Add thumbs up/down for responses

## 📚 Resources

- [Groq Documentation](https://console.groq.com/docs)
- [Llama 3.1 Model Card](https://huggingface.co/meta-llama/Meta-Llama-3.1-70B)
- [Groq Playground](https://console.groq.com/playground) - Test prompts

---

## ✅ Quick Start Checklist

- [ ] Sign up for Groq account
- [ ] Generate API key
- [ ] Add key to `server/.env`
- [ ] Run `npm install` in server
- [ ] Restart server
- [ ] Visit `/chat` page
- [ ] Test with sample questions
- [ ] Enjoy your AI-powered platform! 🎉

---

**Need Help?** Check the server logs or open an issue in your repository!
