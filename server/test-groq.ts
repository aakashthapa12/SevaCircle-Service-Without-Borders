import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

async function testGroqConnection() {
  console.log('🔍 Testing Groq API connection...\n');
  
  try {
    console.log('API Key present:', process.env.GROQ_API_KEY ? '✅ Yes' : '❌ No');
    console.log('API Key format:', process.env.GROQ_API_KEY?.startsWith('gsk_') ? '✅ Valid' : '❌ Invalid');
    
    console.log('\n📡 Sending test request to Groq API...');
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Say "Hello! I am working correctly." in one sentence.',
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 50,
    });

    const response = chatCompletion.choices[0]?.message?.content || '';
    
    console.log('✅ SUCCESS! Groq API is working!\n');
    console.log('Response from AI:', response);
    console.log('\n🎉 All systems operational! You can now start the application.\n');
    
  } catch (error: any) {
    console.error('❌ ERROR: Groq API connection failed!\n');
    console.error('Error details:', error.message);
    
    if (error?.status === 401) {
      console.error('\n⚠️  Invalid API key. Please check:');
      console.error('   1. Your .env file has GROQ_API_KEY set');
      console.error('   2. The key is valid at https://console.groq.com/keys');
      console.error('   3. The key starts with "gsk_"');
    }
    
    process.exit(1);
  }
}

testGroqConnection();
