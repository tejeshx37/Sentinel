const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Mock Data
// Mutable Data
let USER_DATA = {
    name: "User",
    balance: 8500,
    sentinelScore: 35,
    riskLevel: "SEVERE",
    daysLeft: 14,
    currency: "₹",
    streak: 7,
    missionsCompleted: 5
};

let MISSIONS = [
    {
        id: '1',
        title: 'Review Subscriptions',
        subtitle: 'Estimated savings: ₹500/mo',
        status: 'start',
        type: 'optimization'
    },
    {
        id: '2',
        title: 'Weekly Budget Check',
        subtitle: 'Last checked: 3 days ago',
        status: 'continue',
        type: 'routine'
    },
    {
        id: '3',
        title: 'Emergency Fund Setup',
        subtitle: 'Goal: ₹10,000 for safety',
        status: 'start',
        type: 'security'
    },
    {
        id: '4',
        title: 'Merchant Audit',
        subtitle: 'Identify hidden fee patterns',
        status: 'start',
        type: 'optimization'
    }
];

app.post('/api/missions/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const mission = MISSIONS.find(m => m.id === id);
    if (mission) {
        mission.status = status;
        if (status === 'completed') {
            USER_DATA.missionsCompleted += 1;
            if (USER_DATA.missionsCompleted % 3 === 0) {
                USER_DATA.streak += 1;
            }
        }
        res.json({ mission, userData: USER_DATA });
    } else {
        res.status(404).json({ error: 'Mission not found' });
    }
});

// Helper: Recalculate Logic
const { analyzeRisk } = require('./riskEngine');
const { loadTransactionsFromCSV } = require('./csvLoader');

let currentDataset = 'dataset_1.csv';
let TRANSACTIONS = [];

const recalculateSentinel = () => {
    const analysis = analyzeRisk(TRANSACTIONS, USER_DATA.balance);
    USER_DATA.sentinelScore = analysis.sentinel_score;
    USER_DATA.riskLevel = analysis.risk_mode;
    USER_DATA.daysLeft = analysis.runway_days;
    if (analysis.alerts && analysis.alerts.length > 0) {
        console.log("Risk Alerts:", analysis.alerts);
    }
};

const switchDataset = (filename) => {
    console.log(`Switching to dataset: ${filename}`);
    const filePath = `./data/${filename}`;
    const loadedTransactions = loadTransactionsFromCSV(filePath);

    if (loadedTransactions.length > 0) {
        TRANSACTIONS = loadedTransactions;
        const lastTx = loadedTransactions[loadedTransactions.length - 1];
        USER_DATA.balance = lastTx.balance;
        currentDataset = filename;
        recalculateSentinel();
        return true;
    }
    return false;
};

// Initial Data Load
switchDataset(currentDataset);

app.post('/api/switch-dataset', (req, res) => {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ error: 'Filename is required' });
    if (switchDataset(filename)) {
        res.json({ message: `Switched to ${filename}`, userData: USER_DATA });
    } else {
        res.status(404).json({ error: 'Dataset not found or empty' });
    }
});

app.get('/api/current-dataset', (req, res) => {
    res.json({ dataset: currentDataset });
});

app.get('/', (req, res) => {
    res.send('Sentinel Dashboard API is running');
});

app.get('/api/user', (req, res) => {
    res.json(USER_DATA);
});

app.get('/api/transactions', (req, res) => {
    res.json(TRANSACTIONS);
});

app.get('/api/missions', (req, res) => {
    res.json(MISSIONS);
});

app.get('/api/safe-spend', (req, res) => {
    const { balance, daysLeft } = USER_DATA;
    const safeSpend = Math.floor(balance / Math.max(1, Math.ceil(daysLeft)));
    res.json({ safeDailySpend: safeSpend });
});

const { parseTransactionSms } = require('./smsParser');
app.post('/api/parse-sms', (req, res) => {
    const { smsText } = req.body;
    if (!smsText) return res.status(400).json({ error: 'smsText is required' });
    const result = parseTransactionSms(smsText);
    if (result && result.amount) {
        if (result.type === 'debit') USER_DATA.balance -= result.amount;
        else if (result.type === 'credit') USER_DATA.balance += result.amount;
        const newTx = {
            id: TRANSACTIONS.length + 1,
            title: result.merchant || 'Unknown',
            amount: result.amount,
            category: result.category,
            date: new Date().toISOString().split('T')[0]
        };
        TRANSACTIONS.unshift(newTx);
        recalculateSentinel();
        res.json({ ...result, updatedUser: USER_DATA, message: 'Transaction processed' });
    } else {
        res.json({ message: 'No valid transaction found in SMS' });
    }
});

const { generateFinancialAdvice } = require('./openaiService');
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    try {
        const reply = await generateFinancialAdvice(message, USER_DATA, TRANSACTIONS, currentDataset);
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'AI processing failed' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
