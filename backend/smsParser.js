const parseTransactionSms = (smsText) => {
    // Parse bank/UPI SMS to extract transaction details
    // Supports common Indian bank SMS formats

    const transaction = {
        raw_sms: smsText,
        timestamp: new Date().toISOString(),
        amount: null,
        type: null,
        merchant: null,
        balance: null,
        category: 'uncategorized'
    };

    // Extract amount
    const amountPattern = /(?:Rs\.?|INR|₹)\s*(\d+(?:,\d+)*(?:\.\d{2})?)/i;
    const amountMatch = smsText.match(amountPattern);
    if (amountMatch) {
        const amountStr = amountMatch[1].replace(/,/g, '');
        transaction.amount = parseFloat(amountStr);
    }

    // Determine transaction type
    const lowerText = smsText.toLowerCase();
    if (['debited', 'debit', 'paid', 'spent', 'withdrawn'].some(word => lowerText.includes(word))) {
        transaction.type = 'debit';
    } else if (['credited', 'credit', 'received', 'deposited'].some(word => lowerText.includes(word))) {
        transaction.type = 'credit';
    }

    // Extract balance
    const balancePattern = /(?:bal|balance|avbl|available).*?(?:rs\.?|inr|₹)\s*(\d+(?:,\d+)*(?:\.\d{2})?)/i;
    const balanceMatch = smsText.match(balancePattern);
    if (balanceMatch) {
        const balanceStr = balanceMatch[1].replace(/,/g, '');
        transaction.balance = parseFloat(balanceStr);
    }

    // Extract merchant (simple pattern)
    // Matches "at [Merchant]" or "to [Merchant]" or "from [Merchant]" followed by "on", "dated", dot or "UPI"
    const merchantPattern = /(?:at|to|from)\s+([A-Z][A-Za-z\s]+?)(?:\s+on|\s+dated|\.|\s+UPI)/;
    const merchantMatch = smsText.match(merchantPattern);
    if (merchantMatch) {
        transaction.merchant = merchantMatch[1].trim();
    }

    // Auto-categorize based on merchant
    transaction.category = categorizeTransaction(transaction.merchant);

    return transaction.amount ? transaction : null;
};

const categorizeTransaction = (merchant) => {
    if (!merchant) return 'uncategorized';

    const merchantLower = merchant.toLowerCase();

    const categories = {
        'food': ['swiggy', 'zomato', 'restaurant', 'cafe', 'food', 'dominos', 'pizza'],
        'transport': ['uber', 'ola', 'rapido', 'metro', 'petrol', 'fuel'],
        'shopping': ['amazon', 'flipkart', 'myntra', 'ajio', 'store'],
        'utilities': ['electricity', 'water', 'gas', 'recharge', 'mobile'],
        'entertainment': ['netflix', 'spotify', 'prime', 'movie', 'bookmyshow']
    };

    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => merchantLower.includes(keyword))) {
            return category;
        }
    }

    return 'others';
};

module.exports = { parseTransactionSms };
