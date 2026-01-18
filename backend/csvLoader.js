const fs = require('fs');
const path = require('path');

const loadTransactionsFromCSV = (filePath) => {
    try {
        const absolutePath = path.resolve(filePath);
        if (!fs.existsSync(absolutePath)) {
            console.error(`CSV file not found: ${absolutePath}`);
            return [];
        }

        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        const lines = fileContent.split('\n').filter(line => line.trim() !== '');

        // Remove header
        const header = lines.shift(); // date_time,amount,txn_type,balance_after

        const transactions = lines.map((line, index) => {
            const [date_time, amount, txn_type, balance_after] = line.split(',');

            // Basic parsing
            const parsedAmount = parseFloat(amount);
            const type = txn_type ? txn_type.trim().toLowerCase() : (parsedAmount < 0 ? 'debit' : 'credit');
            const absAmount = Math.abs(parsedAmount);

            return {
                id: index + 1,
                date: date_time ? date_time.trim() : new Date().toISOString(),
                title: type === 'credit' ? 'Deposit' : 'Expenditure', // No merchant in CSV
                amount: absAmount,
                type: type,
                category: type === 'credit' ? 'Income' : 'Reserves', // Default category
                balance: parseFloat(balance_after)
            };
        });

        return transactions;
    } catch (error) {
        console.error('Error loading CSV:', error);
        return [];
    }
};

module.exports = { loadTransactionsFromCSV };
