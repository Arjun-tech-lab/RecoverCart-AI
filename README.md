# 🛒 RecoverCart AI

**Track 2 Submission: AI-Assisted Checkout Recovery Copilot**

> An invisible layer of AI commerce infrastructure that detects user friction in real-time and intervenes to save the sale *before* cart abandonment happens.

---

## 🎥 Demo Video
Demo video link: https://drive.google.com/file/d/1XhQ2ZmZuCAHRjbmdJaxNLSFRAhmBxVmm/view?usp=sharing

---

## 🚀 Problem Statement

Cart abandonment averages 70% across the e-commerce industry. The standard legacy solution is the "abandoned cart email" which is inherently flawed because it attempts to recover a user whose intent has already cooled (usually 24 hours later). 

Alternatively, stores use simplistic "exit-intent" popups that blindly offer a 10% discount the second a mouse moves toward the top of the screen, which trains users to wait for discounts and destroys profit margins.

**The Solution:** We built a real-time behavioral intervention engine. It acts as an invisible checkout copilot, reading mouse movements, idle times, and interaction patterns to deduce *why* the user is hesitating. It then provides a context-aware intervention (shipping clarity, trust building, dynamic incentives) exactly when the user's intent to buy is highest.

---

## ✨ Core Features & The Hesitation Engine

We built a backend scoring model that tracks 5 specific "Friction Paths" without hijacking the user's screen:

1. 💸 **Price Hesitation:** Detects when high-value items are removed from the cart and offers a targeted discount to save the remainder of the cart.
2. 📦 **Shipping Confusion:** Detects when a user repeatedly toggles between delivery options and intervenes with delivery clarity or an upgrade offer.
3. ⚖️ **Quantity Uncertainty:** Detects erratic quantity adjustments (+/- buttons) and offers bundle value optimizations.
4. 🛡️ **Trust & Payment Gaps:** Detects when a user deliberately hovers over the "Proceed to Checkout" button for 3 continuous seconds without clicking, and instantly reinforces trust with security and COD badges.
5. ⏳ **General Inactivity:** Detects when a user has gone idle (e.g., opened a new tab) and creates urgency by reserving their cart.

---

## 📄 Core Documentation (Judging Materials)

As requested, we have heavily documented our thought process, architecture, and tradeoffs. Please review the following markdown files included in this repository:

*   📘 **[Product Document](./PRODUCT_DOC.md):** What we built, who it's for, and the scope of our AI interventions.
*   ⚙️ **[Technical Document](./TECHNICAL_DOC.md):** Our architecture, how the Hesitation Engine pipeline works, and our edge-case handling.
*   🧠 **[Decision Log](./DECISION_LOG.md):** Our "Considered X, Chose Y, Because Z" log detailing our hardest engineering and UI choices.
*   👥 **[Contribution Note](./CONTRIBUTION.md):** The team split and ownership breakdown between Arjun and Ullas.

---

## 🛠️ How to Run Locally

This project operates on a decoupled architecture and requires both the frontend and backend servers to be running simultaneously.

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn

### 1. Start the Backend (Hesitation Engine)
Open a terminal instance and run:
```bash
cd backend
npm install
npm run dev
```
*The backend will start running on http://localhost:5000*

### 2. Start the Frontend (E-Commerce UI)
Open a **second** terminal instance and run:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start running on http://localhost:3000*

### 3. Test the Copilot
1. Navigate to `http://localhost:3000`.
2. Add a product to your cart and navigate to the `/cart` page.
3. Test any of the friction scenarios (e.g., do nothing for 15 seconds, remove an item, or hold your mouse over the Checkout button for 3 seconds).
4. Watch the AI side-panel instantly respond.

---

## 👥 Team
*   **Arjun Indavara** - Product Thinking & Backend Engineering
*   **Ullas** - Frontend Setup & UI Integration

Github Link:https://github.com/Arjun-tech-lab/RecoverCart-AI 



*Built for Kasparro AI Commerce Infrastructure.*