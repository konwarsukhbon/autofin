import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Temporarily disabled for deployment
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to categorize spending
const categorizeSpending = (transactions) => {
  const categories = {
    necessities: 0,
    entertainment: 0,
    food: 0,
    transportation: 0,
    shopping: 0,
    bills: 0,
    others: 0
  };

  transactions.forEach(transaction => {
    const amount = Math.abs(transaction.amount);
    const category = transaction.category?.toLowerCase() || 'others';
    
    if (['rent', 'utilities', 'insurance', 'bills'].includes(category)) {
      categories.necessities += amount;
    } else if (['entertainment', 'movies', 'games'].includes(category)) {
      categories.entertainment += amount;
    } else if (['food', 'groceries', 'dining', 'restaurant'].includes(category)) {
      categories.food += amount;
    } else if (['transport', 'fuel', 'uber', 'taxi'].includes(category)) {
      categories.transportation += amount;
    } else if (['shopping', 'clothes', 'electronics'].includes(category)) {
      categories.shopping += amount;
    } else {
      categories[category] = (categories[category] || 0) + amount;
    }
  });

  return categories;
};

// Helper function to detect unusual spending
const detectUnusualSpending = (recentTransactions, historicalAverage) => {
  const recentTotal = recentTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const threshold = historicalAverage * 1.3; // 30% above average
  
  return {
    isUnusual: recentTotal > threshold,
    difference: recentTotal - historicalAverage,
    percentage: ((recentTotal - historicalAverage) / historicalAverage * 100).toFixed(1)
  };
};

// Helper function to calculate savings rate
const calculateSavingsRate = (income, expenses) => {
  const savingsAmount = income - expenses;
  const savingsRate = (savingsAmount / income * 100).toFixed(1);
  return { savingsAmount, savingsRate };
};

export async function POST(req) {
  // Temporarily disabled - return maintenance message
  return NextResponse.json({
    message: "AI Agent API is temporarily disabled for deployment. Please configure GEMINI_API_KEY environment variable to enable this feature.",
    status: "maintenance"
  }, { status: 503 });

  // Original code commented out below
  /*
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'AI service is not configured' },
      { status: 500 }
    );
  }

  try {
    const { userInput, userId, conversationHistory = [] } = await req.json();

    if (!userId || !userInput) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch comprehensive user data
    const userProfile = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        id: true,
        name: true,
        goals: true,
        income: true,
        createdAt: true,
        preferences: true,
        budgets: {
          select: {
            amount: true,
          },
        },
      },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const prismaUserId = userProfile.id;

    // Fetch recent transactions (last 30 days)
    const recentTransactions = await db.transaction.findMany({
      where: { 
        userId: prismaUserId,
        date: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      },
      orderBy: { date: 'desc' },
      take: 20
    });

    // Fetch historical data for comparison
    const historicalTransactions = await db.transaction.findMany({
      where: { userId: prismaUserId },
      orderBy: { date: 'desc' },
      take: 100
    });

    const { name, goals, income, budgets } = userProfile;
    const budget = budgets?.[0]?.amount || null;
    
    // Analyze spending patterns
    const spendingBreakdown = categorizeSpending(recentTransactions);
    const totalRecentSpending = Object.values(spendingBreakdown).reduce((sum, amount) => sum + amount, 0);
    const historicalAverage = historicalTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / Math.max(historicalTransactions.length, 1);
    const unusualSpending = detectUnusualSpending(recentTransactions, historicalAverage);
    const savingsData = calculateSavingsRate(income || 0, totalRecentSpending);

    // Check for milestones and achievements
    const budgetUsage = budget ? (totalRecentSpending / budget * 100).toFixed(1) : null;
    const isOnTrack = budgetUsage ? parseFloat(budgetUsage) <= 100 : true;

    // Enhanced prompt with context awareness
    const systemPrompt = `
You are AutoFin, a helpful and supportive AI financial assistant integrated into a budget expense tracking app. Your personality is:
- Warm, encouraging, and non-judgmental
- Knowledgeable about personal finance
- Adaptive to user preferences and feedback
- Privacy-conscious and trustworthy

IMPORTANT GUIDELINES:
1. Always maintain a positive, supportive tone
2. Provide actionable, personalized advice
3. Celebrate user progress and achievements
4. Never judge users for their spending habits
5. Offer alternatives and suggestions, not criticism
6. Use emojis appropriately to make conversations engaging
7. Ask follow-up questions to better understand user needs
8. Provide specific, measurable recommendations when possible

USER CONTEXT:
- Name: ${name || 'there'}
- Financial Goals: ${goals || 'Not specified'}
- Monthly Income: ₹${income || 'Not provided'}
- Monthly Budget: ₹${budget ? budget.toFixed(2) : 'Not set'}
- Days since joining: ${userProfile.createdAt ? Math.floor((Date.now() - new Date(userProfile.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 'Unknown'}

CURRENT FINANCIAL SNAPSHOT:
- Recent spending (30 days): ₹${totalRecentSpending.toFixed(2)}
- Budget usage: ${budgetUsage ? budgetUsage + '%' : 'No budget set'}
- Savings rate: ${savingsData.savingsRate}%
- Status: ${isOnTrack ? 'On track' : 'Over budget'}

SPENDING BREAKDOWN:
${Object.entries(spendingBreakdown)
  .filter(([_, amount]) => amount > 0)
  .map(([category, amount]) => `- ${category.charAt(0).toUpperCase() + category.slice(1)}: ₹${amount.toFixed(2)}`)
  .join('\n')}

ALERTS:
${unusualSpending.isUnusual ? `⚠️ Unusual spending detected: ${unusualSpending.percentage}% above average` : '✅ Spending patterns look normal'}

RECENT TRANSACTIONS:
${recentTransactions.slice(0, 5).map(t => 
  `- ${t.description || 'Transaction'}: ₹${t.amount} (${t.category || 'Uncategorized'}) - ${new Date(t.date).toLocaleDateString()}`
).join('\n')}

CONVERSATION HISTORY:
${conversationHistory.slice(-3).map(msg => `User: ${msg.user}\nAutoFin: ${msg.ai}`).join('\n\n')}

User Message: "${userInput}"

Based on the user's financial context and current situation, provide a helpful response that:
1. Addresses their specific question or concern
2. Considers their financial goals and current spending patterns
3. Offers personalized suggestions or insights
4. Maintains an encouraging and supportive tone
5. Includes relevant financial tips when appropriate
6. Asks follow-up questions to better assist them

If this is their first interaction, warmly welcome them and offer to help with their financial goals.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(systemPrompt + "\n\nUser: " + userInput);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
      spendingBreakdown,
      unusualSpending,
      savingsData,
      budgetUsage,
      isOnTrack
    });

  } catch (error) {
    console.error('AI Agent Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
  */
} 