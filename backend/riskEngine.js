// app/services/risk_engine.py -> backend/riskEngine.js

const calculateSentinelScore = (transactions) => {
    /* Calculate Sentinel Score (0-100) */
    if (!transactions || transactions.length === 0) {
        return 50;
    }

    try {
        // Get latest balance
        const latestBalance = getLatestBalance(transactions);

        // Calculate burn rate
        const burnRate = calculateBurnRate(transactions);

        // Calculate runway
        const runway = calculateRunway(latestBalance, burnRate);

        // Score calculation
        const balanceScore = Math.min(latestBalance / 5000 * 40, 40);
        const runwayScore = Math.min(runway / 30 * 40, 40);
        const stabilityScore = 20;

        const totalScore = balanceScore + runwayScore + stabilityScore;

        // return round(min(max(total_score, 0), 100))
        return Math.round(Math.min(Math.max(totalScore, 0), 100));
    } catch (e) {
        console.error(`Error calculating sentinel score: ${e}`);
        return 50;
    }
};

const calculateBurnRate = (transactions) => {
    /* Calculate average daily spending */
    try {
        if (!transactions || transactions.length === 0) {
            return 0;
        }

        const debits = transactions.filter(t => t.type === 'debit' && t.amount);
        if (debits.length === 0) {
            return 0;
        }

        const totalDebit = debits.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

        // Calculate actual number of days spanned by transactions
        try {
            // Handle ISO format 'YYYY-MM-DDTHH:MM:SS' or 'YYYY-MM-DD'
            const dates = transactions
                .map(t => t.timestamp || t.date)
                .filter(ts => ts)
                .map(ts => new Date(ts));

            if (dates.length === 0) {
                return totalDebit / Math.max(debits.length, 1);
            }

            // Find min and max dates
            const minDate = new Date(Math.min.apply(null, dates));
            const maxDate = new Date(Math.max.apply(null, dates));

            // Difference in days
            const diffTime = Math.abs(maxDate - minDate);
            const daysSpan = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include start day

            return totalDebit / Math.max(daysSpan, 1);
        } catch (e) {
            return totalDebit / Math.max(debits.length, 1);
        }
    } catch (e) {
        console.error(`Error calculating burn rate: ${e}`);
        return 0;
    }
};

const calculateRunway = (balance, burnRate) => {
    /* Calculate how many days money will last */
    try {
        balance = parseFloat(balance) || 0;
        burnRate = parseFloat(burnRate) || 0;

        if (burnRate === 0) {
            return 999;
        }

        if (balance <= 0) {
            return 1;
        }

        const runway = balance / burnRate;
        // Set a minimum of 1 day for UI consistency
        return Math.max(runway, 1);
    } catch (e) {
        console.error(`Error calculating runway: ${e}`);
        return 0;
    }
};

const getLatestBalance = (transactions) => {
    /* Get the most recent balance from transactions */
    try {
        if (!transactions || transactions.length === 0) {
            return 0;
        }

        // 1. Try to find explicit balance in transactions
        const balances = transactions
            .filter(t => t.balance !== undefined && t.balance !== null)
            .map(t => parseFloat(t.balance));

        if (balances.length > 0) {
            return balances[balances.length - 1]; // Assuming arrays needed to be sorted or are sorted
        }

        // 2. If no balance found, calculate from credits and debits assuming 0 start
        // NOTE: In our Node app we usually HAVE a USER_DATA.balance, strictly speaking this functions
        // might receive the current global balance or calculate it.
        // For compatibility with the python logic, let's keep the logic but usually we might pass current balance in.

        // However, the python version recalculated it entirely from history if missing.
        // Let's stick to the ported logic:
        const totalCredits = transactions
            .filter(t => t.type === 'credit')
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

        const totalDebits = transactions
            .filter(t => t.type === 'debit')
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

        return Math.max(totalCredits - totalDebits, 0);
    } catch (e) {
        console.error(`Error getting latest balance: ${e}`);
        return 0;
    }
};

const generateAlerts = (riskMode, balance, runway) => {
    /* Generate appropriate alerts based on risk */
    const alerts = [];

    try {
        if (riskMode === 'CRITICAL') {
            alerts.push({
                type: 'critical',
                message: `⚠️ Critical: Only ${runway.toFixed(0)} days of runway remaining`,
                action: 'Reduce non-essential spending immediately'
            });
        } else if (riskMode === 'WARNING') {
            alerts.push({
                type: 'warning',
                message: `⚡ Warning: ${runway.toFixed(0)} days until money runs out`,
                action: 'Review your spending pattern'
            });
        } else {
            alerts.push({
                type: 'success',
                message: '✅ Your finances are looking good',
                action: 'Keep up the good work!'
            });
        }

        if (balance < 1000 && balance > 0) {
            alerts.push({
                type: 'low_balance',
                message: `Balance is low: ₹${balance.toFixed(2)}`,
                action: 'Avoid unnecessary expenses'
            });
        }
    } catch (e) {
        console.error(`Error generating alerts: ${e}`);
    }

    return alerts;
};

const analyzeRisk = (transactions, currentBalanceOverride = null) => {
    /* Comprehensive risk analysis */
    try {
        if (!transactions || transactions.length === 0) {
            return {
                sentinel_score: 50,
                current_balance: currentBalanceOverride || 0,
                daily_burn_rate: 0,
                runway_days: 0,
                risk_mode: 'SAFE',
                alerts: [{
                    type: 'info',
                    message: 'No transactions to analyze',
                    action: 'Add transactions to start tracking'
                }]
            };
        }

        // Use override if provided (since we maintain USER_DATA.balance in memory), 
        // otherwise calculate from history
        const balance = currentBalanceOverride !== null ? currentBalanceOverride : getLatestBalance(transactions);

        const burnRate = calculateBurnRate(transactions);
        const runway = calculateRunway(balance, burnRate);
        const sentinelScore = calculateSentinelScore(transactions); // This uses getLatestBalance internally in Python, might need sync

        // Determine risk mode
        let riskMode = 'SAFE';
        if (runway < 3 || balance < 500) {
            riskMode = 'CRITICAL';
        } else if (runway < 7 || balance < 2000) {
            riskMode = 'WARNING';
        }

        return {
            sentinel_score: sentinelScore,
            current_balance: balance,
            daily_burn_rate: parseFloat(burnRate.toFixed(2)),
            runway_days: parseFloat(runway.toFixed(1)),
            risk_mode: riskMode,
            alerts: generateAlerts(riskMode, balance, runway)
        };
    } catch (e) {
        console.error(`Error in analyze_risk: ${e}`);
        return {
            sentinel_score: 50,
            current_balance: 0,
            daily_burn_rate: 0,
            runway_days: 0,
            risk_mode: 'SAFE',
            alerts: [{
                type: 'error',
                message: 'Error analyzing risk',
                action: 'Please try again'
            }]
        };
    }
};

module.exports = {
    calculateSentinelScore,
    calculateBurnRate,
    calculateRunway,
    getLatestBalance,
    analyzeRisk
};
