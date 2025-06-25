// /app/api/bondhu/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';
// import { createClient } from '@supabase/supabase-js';
// import { auth } from '@clerk/nextjs';

// Temporarily disabled for deployment
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

export async function POST(req) {
  // Temporarily disabled - return maintenance message
  return new Response(JSON.stringify({
    message: "Bondhu API is temporarily disabled for deployment. Please configure environment variables to enable this feature.",
    status: "maintenance"
  }), {
    status: 503,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Original code commented out below
  /*
  const { userId } = auth();
  if (!userId) return new Response('Unauthorized', { status: 401 });

  const { message } = await req.json();

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId);

  if (error) return new Response('Failed to fetch transactions', { status: 500 });

  let categorySpend = {};
  let totalSpend = 0;

  transactions.forEach(({ category, amount }) => {
    categorySpend[category] = (categorySpend[category] || 0) + amount;
    totalSpend += amount;
  });

  const overCategories = Object.keys(categorySpend).filter((c) => categorySpend[c] > 10000);

  const alertContext = `
Total Spending: ₹${totalSpend}
Over-limit Categories: ${overCategories.join(', ') || 'None'}
`;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const stream = await model.generateContentStream({
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `
You are Bondhu, a helpful budget assistant.

Alert Summary:
${alertContext}

Transactions:
${JSON.stringify(transactions, null, 2)}

User message: "${message}"

Respond in a friendly, helpful tone. Provide alerts if budgets are crossed and give saving suggestions.
            `
          }
        ]
      }
    ]
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream.stream) {
        const text = chunk.text();
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    }
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
  */
}
