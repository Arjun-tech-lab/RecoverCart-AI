# Technical Document: Architecture & Implementation

## 1. Architecture Overview
The system is built on a decoupled architecture:
*   **Frontend:** Next.js (React) with Tailwind CSS for rapid UI development and styling. Global state and high-frequency metrics are managed via Zustand.
*   **Backend:** Express.js (Node) serving as the logic layer for the Hesitation Engine.
*   **Communication:** A fast polling mechanism pushes frontend telemetry to the backend, which returns JSON-based recovery action plans.

## 2. Implementation Decisions

### The Hesitation Engine Pipeline
The core logic resides on the backend to prevent clients from tampering with the scoring algorithms. It operates in a 3-step pipeline:
1.  **Signal Tracker (`signalTracker.js`):** Sanitizes and ingests raw frontend telemetry (idle time, items removed, hover states, shipping toggles).
2.  **Scoring Rules (`scoringRules.js`):** Assigns weighted points to specific actions. For instance, removing an item carries a heavy weight (30 pts) compared to changing a quantity (20 pts). If the total score breaches the threshold (`triggerDecider.js`), an intervention is authorized.
3.  **Reasons Analyzer (`reasonsAnalyzer.js`):** A priority-based cascade that maps the behavioral footprint to a specific intervention type (e.g., high idle time + hovering on checkout = `trust_payment`).

### Frontend Telemetry Tracking
To avoid UI lag, we decoupled the tracking of user actions from the React render cycle. Zustand acts as an in-memory datastore.
*   *Example:* We use a `useRef` timer attached to the "Proceed to Checkout" button. Instead of spamming the backend on `mouseEnter`, it requires a continuous 3-second hover before it registers the `checkoutHovered` boolean in the Zustand store.

## 3. Failure Handling & Edge Cases
*   **State Overwrite Protection:** Initially, the 500ms polling loop would fetch fresh (unapplied) offers and overwrite offers the user had just accepted. We implemented a circuit breaker in the polling loop: `if (recoveryData?.isApplied) return;`. Once an intervention is successful, the AI engine gracefully halts.
*   **Spam Prevention:** We implemented a cooldown timer. Once an AI intervention fires, the system suppresses further popups for a set interval, ensuring the user is not bombarded with overlapping offers.

## 4. Known Limitations
*   **Browser Throttling:** Because we use client-side `setInterval` for the idle and polling clocks, modern browsers may throttle these timers if the user switches tabs. A production version would require syncing with `Date.now()` delta calculations or using Service Workers to maintain accurate off-tab tracking.
*   **Statelessness:** The current iteration relies entirely on the local Zustand store for session data. If the user does a hard refresh, the behavioral history is lost. Future iterations will persist the analytics token to `localStorage` or tie it to an authenticated user session in a database.
