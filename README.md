**Executive Summary**
The application is a highly polished, client-side React application acting as a multi-step wizard for a business loan application. It uses a modern tech stack (Vite, Tailwind CSS, Lucide React). The UI is heavily inspired by modern fintech patterns (e.g., Razorpay, Stripe), utilizing soft colors, rounded corners (rounded-3xl), subtle borders, and smooth transitions.
**State Management:** The entire flow is managed centrally in App.tsx using simple useState hooks. There is no complex state management library (like Redux or Zustand) or routing library (like React Router), making it a pure Single Page Application (SPA) wizard.

**Screen-by-Screen Deep Dive**
**Screen 1: Entity Selection (EntityCard.tsx & App.tsx)**
Purpose: Let the user select their business structure (Proprietorship, LLP, Pvt Ltd, etc.).

**UI/UX Design:**
Uses a grid of large, clickable cards (EntityCard.tsx).
Each card features a distinct pastel background color (bg-blue-50, bg-green-50, etc.), a Lucide icon, and a hover scale effect (hover:scale-[1.02]).
"Popular" badges are absolutely positioned on the top right of specific cards (Proprietorship, Pvt Ltd).
A green checkmark appears in the bottom right when a card is selected.

**Logic:**
Selecting a card updates the selectedEntity state in App.tsx.
The "Continue" button is disabled until an entity is selected.

**Identity Verification (IdentityVerification.tsx)**
Purpose: Collects PAN and GSTIN to verify the business.
**UI/UX Design:**
Split-screen layout (grid-cols-1 lg:grid-cols-2).
Left Side: A blue-tinted card for PAN input. The input field automatically formats text to uppercase and limits it to 10 characters.
Right Side: Initially shows a placeholder card. After PAN verification, it reveals a green "Verified Business Profile" card (Legal Name, Date of Incorporation, Status) and an orange "Select GSTIN" dropdown card.

**Logic:**
Clicking "Verify Identity" triggers a mock API call (setTimeout for 1.5s) and shows a spinner (Loader2 animate-spin).
Upon success, mock data (Rahul Traders) is populated.
The user must select a GSTIN from a dropdown before the "Confirm & Proceed" button becomes active.
Smart Routing: If the user selected "Proprietorship" in Step 1, this screen routes them directly to the Financials screen. Otherwise, it routes them to the Stakeholder Engine.

**Stakeholder Engine (StakeholderEngine.tsx)**
Purpose: Collects and verifies details of partners/directors for corporate entities.

**UI/UX Design:**
Progress Visualizer: A prominent blue card at the top shows the "Total Shareholding Verified" with a progress bar. It visually indicates a 51% threshold required to proceed.
Left Side (Form): A green-tinted card to add a new partner (Name, PAN, Shareholding %).
Right Side (List): A purple-tinted card listing verified and pending stakeholders. Verified stakeholders get a green badge; pending ones get an amber badge.

**Logic:**
Pre-populated with mock data (Amit Kumar - 30%, Suresh Singh - 0%).
The form validates that Name is not empty, PAN is 10 chars, and Shareholding is between 0-100.
Adding a partner triggers a 1.5s mock verification.
The "Save Stakeholders & Proceed" button is disabled until the sum of verified shareholding is >= 51%.

**Financial Assessment (Financials.tsx)**
Purpose: Collects financial data via Netbanking or Document Upload.

**UI/UX Design:**
Two large, clickable option cards: "Connect via Netbanking" (Blue) and "Upload Bank Statements" (Orange).
Netbanking Card: Features a "Recommended" badge and a grid of supported bank icons.
Upload Card: Features a drag-and-drop zone. When a file is uploaded, it shows the file name, size, and a "Remove file" option.
Loading Overlay: When proceeding, a full-screen blurred overlay appears with a multi-step animated progress indicator ("Data received" -> "Computing ABB score" -> "Generating offers").

**Logic:**
Drag-and-drop logic is fully implemented (onDrop, onDragOver, onDragLeave).
File type validation ensures only PDFs are accepted.
Clicking "Continue" triggers a 3-second mock analysis delay before routing to the Offers screen.

**Loan Offers (Offers.tsx)**
Purpose: Displays the generated loan offer and upsells higher limits.

**UI/UX Design:**
A 3-column pricing-table layout.
Column 1 (Unlocked): The base offer based on Average Bank Balance (ABB). Shows the amount (₹5,00,000), Interest Rate, Tenure, Processing Fee, and calculated EMI. Features a prominent "Apply Now" button.
Column 2 & 3 (Locked): Upsell offers for GST and ITR. These cards use a clever UI trick: the actual card content is rendered but covered by an absolute inset-0 bg-white/60 backdrop-blur-sm overlay. This creates a "glassmorphism" lock screen over the data, enticing the user to click "Link GST to Unlock" or "Upload ITR to Unlock".

**Logic:**
The EMI is calculated dynamically based on the passed abbAmount prop.
Buttons trigger callback functions (onApplyNow, onUnlockGST, onUnlockITR) which are currently stubbed out in App.tsx.

**Code Quality & Architecture Observations**
Strengths:
Excellent UI/UX: The use of color psychology (blue for input, green for success, orange for action, purple for lists) is consistent and highly effective. The use of glassmorphism and blur effects on the locked offers is a premium design touch.
Component Modularity: The separation of concerns is good. Each screen is a self-contained component that receives onNext/onBack callbacks, making them highly reusable.
Micro-interactions: The app makes great use of loading states (Loader2), disabled button states, and hover animations (hover:scale-[1.02], transition-all).
TypeScript Usage: Interfaces are well-defined for props and internal state (e.g., Stakeholder, VerifiedBusinessData), ensuring type safety.
Areas for Improvement (If taking to Production):
Routing: Currently, the app uses conditional rendering (if (currentScreen === '...')) in App.tsx. For a production app, implementing a router (like react-router-dom) would allow for deep linking, browser history (back/forward buttons), and better code splitting.
State Management: The state is lifted entirely to App.tsx. If the app grows, passing props down multiple levels (prop drilling) will become cumbersome. A context provider or state library would be beneficial.
Form Validation: The forms currently use basic if statements for validation. Integrating a library like react-hook-form with zod would provide more robust, scalable validation and error message handling.
Hardcoded Values: Things like the EMI calculation (abbAmount * 0.048 / 12) and the locked offer amounts (₹20L, ₹50L) are hardcoded. These should ideally be driven by a backend API response.
