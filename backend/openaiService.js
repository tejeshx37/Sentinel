const OpenAI = require('openai');

// Initialize OpenAI Client
// Detect if it's an OpenRouter key based on prefix or user instruction
const isOpenRouter = true;

const openai = new OpenAI({
    apiKey: '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',
    baseURL: isOpenRouter ? 'https://openrouter.ai/api/v1' : undefined,
});

const generateFinancialAdvice = async (userMessage, userData, transactions, currentDataset) => {
    try {
        // 1. Prepare Context
        const recentTransactions = transactions.slice(0, 15).map(t =>
            `- ${t.date}: ${t.title} (${t.amount} ${userData.currency}) [${t.category}]`
        ).join('\n');

        const systemPrompt = `
You are Sentinel Pro, a world-class Financial Intelligence AI and Private Wealth Advisor. 
Your purpose is to provide sophisticated, data-driven insights and assist the user with any inquiries—ranging from specific financial strategy to general knowledge—with executive-level professionalism.

SYSTEM CONTEXT:
- Active Dataset: ${currentDataset}
- Current Liquidity: ${userData.balance} ${userData.currency}
- Sentinel Health Index: ${userData.sentinelScore}/100 [Status: ${userData.riskLevel}]
- Estimated Runway: ${userData.daysLeft} days

REAL-TIME TRANSACTIONAL ANALYSIS (Snapshot):
${recentTransactions}

EXECUTIVE PROTOCOLS:
1. VERSATILITY: You are a comprehensive AI assistant. While finance is your core, you can and should answer any question asked with professional rigor.
2. CONTEXTUAL ANCHORING: Whenever a user's query touches on their lifestyle, future, or budget, refer specifically to the 'SYSTEM CONTEXT' and 'TRANSACTIONAL ANALYSIS' to provide tailored, mathematically sound advice.
3. STRUCTURED REPORTING: Use clear hierarchies, bold headers, and bullet points for complex plans or detailed answers.
4. TONE: Eloquent, objective, and analytical. You are a strategic partner, not just a chatbot.
5. NO PLACEDHOLDERS: Provide specific numbers and dates based on the data. For multi-day plans, calculate exact daily allocations (Balance / Days).

User Query: "${userMessage}"
        `;

        // 2. Call AI
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            temperature: 0.6,
            max_tokens: 1000,
        });

        return completion.choices[0].message.content;

    } catch (error) {
        console.error("AI Service Error:", error);
        return "Sentinel Core Connection Interrupted. Unable to process financial analysis at this moment.";
    }
};

module.exports = { generateFinancialAdvice };
