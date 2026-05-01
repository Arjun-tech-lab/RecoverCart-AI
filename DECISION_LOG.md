Decision Log
The following outlines the key technical and product decisions made during the development of the AI-Assisted Checkout Recovery Copilot.
1. Telemetry Transmission


Considered: Firing a unique API call on every single DOM event (click, hover, focus).


Chose: A 500ms background polling loop that batches the current state of the Zustand metrics store and sends a single payload.


Because: Sending individual HTTP requests for every mouse movement or button click would create immense network overhead and race conditions. Polling allows us to batch the data, calculate compound metrics (like "continuous idle time"), and keeps the frontend snappy.


2. Detecting "Trust Gap" Friction


Considered: Triggering the trust/security intervention the moment the user's mouse touches the "Proceed to Checkout" button.


Chose: Requiring a continuous, unbroken 3-second hover over the button using a React useRef timer.


Because: Users frequently mouse over buttons accidentally while navigating. Instantly popping up an AI intervention based on a stray mouse movement feels spammy and cheap. Requiring a deliberate, 3-second hold filters out the noise and acts as a high-confidence signal of genuine hesitation.


3. State Management


Considered: Using native React Context API for cart and metric tracking.


Chose: Zustand.


Because: React Context triggers a re-render for every component consuming the context whenever any value inside it changes. Because we are tracking high-frequency metrics (like seconds spent on page), Context would have caused massive, cascading re-renders across the entire layout. Zustand allows us to fetch state outside of the React render cycle, preserving performance.


4. User Interface Design


Considered: Using a traditional, center-screen modal popup to deliver discounts (the industry standard for exit-intent).


Chose: An elegant, slide-in "Copilot" card that sits alongside the order summary.


Because: Center-screen modals hijack the browser, block the user from interacting with the cart, and cause high frustration. We are building premium AI commerce infrastructure; the AI should act as a helpful assistant sitting next to the user, not a roadblock preventing them from clicking around.


5. Handling Accepted Offers


Considered: Letting the backend handle state synchronization for accepted vs. unaccepted offers.


Chose: A frontend circuit-breaker that immediately halts the AI polling loop the moment an offer is applied.


Because: Due to the aggressive 500ms polling interval, the frontend was overwriting applied discounts with fresh, unapplied payloads from the backend. Halting the loop entirely once a successful intervention occurs guarantees UI stability and reduces unnecessary server load.


6. Intervention Timing Strategy


Considered: Triggering offers immediately on page load.


Chose: Waiting for hesitation signals before intervening.


Because: Immediate offers train users to wait for discounts and feel generic. Triggering only during real friction moments makes the system feel intelligent and preserves merchant margins.


7. Offer Strategy


Considered: Always giving percentage discounts.


Chose: Using lowest-cost intervention first (shipping clarity, trust reassurance, free shipping), then discounts only when necessary.


Because: Many cart drop-offs are caused by uncertainty, not price. Solving friction before using discounts protects profitability.

