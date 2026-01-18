# Sentinel — # Sentinel — Financial Runway Intelligence App

## Overview

Sentinel is a personal financial AI assistant and early warning system that predicts how many days a user can financially sustain themselves based on their current balance and spending velocity. 

It is designed to operate either as a standalone application or as a modular financial intelligence layer that can integrate with existing systems through event-based transaction signals.


Instead of acting as a bank mirror or expense tracker, Sentinel focuses on **forward-looking risk detection** — answering one critical question:

> *“At my current spending rate, how many days do I have before I run out of money?”*

Sentinel is designed to work even with **partial, noisy, or missing data**, making it practical for real-world usage and hackathon constraints.

---

## Problem Statement

Most personal finance apps focus on historical tracking:
- Where money was spent
- Monthly summaries
- Category breakdowns

However, users often fail financially **not because they lack history**, but because they lack **early warning**.

Key challenges:
- Incomplete or deleted transaction history
- No real-time sense of financial runway
- High friction due to bank APIs, KYC, or complex onboarding

Sentinel addresses these by prioritizing **early detection over accounting accuracy**.

---

## Core Idea

Sentinel treats financial health as a **forecasting problem**, not a ledger problem.

The system:
1. Takes a **snapshot** of the user’s current balance
2. Estimates **daily burn rate**
3. Continuously updates predictions using **event-based transaction deltas**
4. Calculates **Days-To-Shortfall (DTS)** in real time

This enables users to see financial risk **before** it becomes a crisis.

---

## Key Features

### 1. Event-Driven Balance Tracking
- Uses transaction **deltas** (debit / credit events)
- Maintains an internal `effective_balance`
- Does **not** reconstruct full bank ledgers

### 2. Days-To-Shortfall (DTS) Engine
- Calculates how many days remain before balance reaches zero
- Formula:   DTS = effective_balance / daily_burn_rate

### 3. Risk Classification
- SAFE: DTS > 30 days
- WARNING: DTS between 15–30 days
- CRITICAL: DTS < 15 days

### 4. Graceful Degradation
- Works with:
- Full SMS data
- Partial SMS data
- No SMS data (bootstrap mode)
- System remains functional at all stages

### 5. Confidence Scoring
- Communicates prediction reliability
- Increases as real transaction data accumulates
- Prevents over-trust in sparse data scenarios

---

## AI & Modeling Approach

### Multimodal Ridge Regression (Conceptual Layer)

Sentinel uses a **multimodal regression approach** to estimate the user’s daily burn rate.

Inputs (modalities):
- User-declared monthly spending (self-reported)
- Observed debit events from SMS
- Debit frequency and timing patterns
- Short-term spending trends

These signals are:
- Sparse
- Correlated
- Noisy

To stabilize estimation, **ridge regression (L2 regularization)** is conceptually applied to prevent overreaction to short-term spikes and missing data.

> Note: The regression is used **only to estimate burn rate**, not to predict balance directly.

---

### EWMA (Exponential Weighted Moving Average)

To handle volatility and short-term noise in spending behavior, Sentinel applies **EWMA smoothing** on observed transaction data.

EWMA ensures:
- Recent behavior is weighted more heavily
- Sudden spikes do not distort predictions
- Burn rate adapts smoothly over time

This makes the system responsive yet stable.

---

## System Architecture

### Event-Driven Backend (n8n)

Sentinel’s backend is built using **n8n**, enabling a clean, modular, and event-driven workflow.

#### Why n8n?
- Deterministic execution
- Clear node-level logic
- Easy visualization for debugging and demos
- No hidden side effects

---

### n8n Workflow Overview

The workflow is triggered whenever a **parsed SMS transaction event** is received.

#### Core Nodes:
1. **SMS Webhook Trigger**
 - Receives structured transaction events (parsed externally)

2. **State Initialization**
 - Initializes or loads `effective_balance`

3. **Transaction Delta Processor**
 - Applies debit/credit deltas to balance

4. **Declared Burn Rate Calculator**
 - Converts monthly spend → daily rate

5. **Observed Burn Rate Estimator**
 - Estimates burn rate from recent debit events

6. **Burn Rate Blender**
 - Combines declared and observed signals (multimodal fusion)

7. **DTS & Risk Engine**
 - Computes Days-To-Shortfall and risk level

8. **Confidence & Response Builder**
 - Outputs product-ready response with explanation

---

## Data Handling & Privacy

- No bank APIs are used
- No money is moved or stored
- No KYC is required
- SMS parsing is assumed to happen **on-device or externally**
- Sentinel only consumes **explicitly provided transaction events**

---

## Use Cases

- Students managing limited monthly allowances
- Early-career professionals avoiding end-of-month shortfalls
- Financial coaching and advisory layers
- Preventive financial wellness tools

---

## Why Sentinel Is Different

- Focuses on **future risk**, not past spending
- Works without full transaction history
- Handles missing data by design
- Separates prediction (ML) from decision logic (math)
- Built as a **product**, not just a project

---

## Limitations & Future Scope

- Bank integrations and Account Aggregator support can be added later
- KYC required only if payments or lending are introduced
- Longer history improves confidence but is not mandatory
- Mobile-first UI and real-time notifications planned

---

## Conclusion

Sentinel demonstrates how meaningful financial insight can be delivered using:
- Minimal assumptions
- Event-driven design
- Lightweight AI modeling
- Clear product boundaries

By prioritizing **early warning over perfect accuracy**, Sentinel enables users to act before financial failure occurs. 
