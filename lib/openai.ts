export async function askAI(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    return "AI assistant is not configured. Please add your OpenAI API key.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant embedded in a HyperCard-like system from 1987. 
            Respond in a helpful, friendly manner as if you were a simple AI from the 1980s. 
            Keep responses brief and to the point. You can speak both English and Japanese.
            When asked about HyperCard or Bill Atkinson, share interesting historical facts.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Error:', error);
    return "Sorry, I couldn't process that request. Please try again.";
  }
}