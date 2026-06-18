Live Preview: https://instantweb-1.onrender.com

<h4>InstantWeb is a full-stack AI-powered SaaS application that allows users to generate, edit, preview, and deploy complete websites using natural language prompts. Built with the MERN stack, it integrates DeepSeek AI via OpenRouter to produce responsive, real-world HTML/CSS/JS websites instantly.</h4>


✨ Features


🤖 AI Website Generation — Describe your website in plain English and get a fully responsive HTML site in seconds using DeepSeek via OpenRouter
<br>
🖊️ Monaco Code Editor — Edit the generated code directly in-browser with VS Code-like experience
<br>
👁️ Live Preview — Instant iframe preview of generated and edited websites
<br>
🚀 One-Click Deploy — Deploy websites to a public URL instantly
<br>
💳 Razorpay Payments(test-mode) — Integrated credit-based payment system with secure signature verification
<br>
🔐 Google Authentication — Firebase-powered Google OAuth login
<br>
🎯 Credit System — Pay-as-you-go model (Free / Pro / Enterprise plans)
<br>
📱 Fully Responsive UI — Works seamlessly on mobile, tablet, and desktop
<br>

📸 Screenshots

🏠 Homepage
<img width="1532" height="696" alt="Screenshot 2026-06-17 162015" src="https://github.com/user-attachments/assets/3c910811-198f-4e2a-8dcb-ddbdd6319578" />
Generate Page — AI Website Builder
<img width="1260" height="705" alt="Screenshot 2026-06-17 144906" src="https://github.com/user-attachments/assets/5c008a93-9115-455e-a2df-9581d49a2275" />
📊 Dashboard — All Your Websites

<img width="1271" height="730" alt="Screenshot 2026-06-17 144833" src="https://github.com/user-attachments/assets/d68cefeb-4c81-4e99-99a1-283990abeb84" />


🖊️ Website Editor — Monaco + Live Preview

<img width="1512" height="742" alt="Screenshot 2026-06-17 144424" src="https://github.com/user-attachments/assets/ce4e8abd-f33c-40b2-b6a8-e05053953fed" />


💳 Razorpay Payment Gateway

<img width="1447" height="708" alt="Screenshot 2026-06-17 162038" src="https://github.com/user-attachments/assets/cf72ddcc-ee6a-47c1-8075-e33b882785f7" />
<br>

🛠️ Tech Stack

Frontend

TechnologyPurposeReact + ViteFrontend framework & build toolRedux ToolkitGlobal state managementRedux PersistState persistence across sessionsAxiosHTTP requestsFirebase AuthGoogle OAuth authenticationFramer MotionAnimations & transitionsMonaco EditorIn-browser code editorLucide ReactIconsReact Hot ToastNotificationsTailwind CSSStyling

Backend

TechnologyPurposeNode.js + ExpressServer & REST APIMongoDB + MongooseDatabaseJWTAuthentication tokensHTTP-Only CookiesSecure token storageOpenRouter APIAI model accessDeepSeek ModelWebsite code generationRazorpayPayment gatewayCORS + Cookie ParserSecurity & middlewareExpress Rate LimitAPI rate limiting & DDoS protection
<br>

🏗️ Architecture

┌─────────────────────────────────────────────────────────┐
<br>
│                     CLIENT (React + Vite)                │
<br>
│  HomePage → Login → Dashboard → Generate → Editor       │
<br>
│       Redux Store (Persist) + Firebase Auth              │
<br>
└──────────────────────┬──────────────────────────────────┘
<br>
                       │ Axios + HTTP-Only Cookies
                       <br>
                       │
┌──────────────────────▼──────────────────────────────────┐
<br>
│                  SERVER (Express + Node.js)               │
<br>
│                                                          │
<br>
│  Auth Routes    → authController  → Firebase + JWT       │
<br>
│  Website Routes → websiteController → OpenRouter AI      │
<br>
│  Payment Routes → paymentController → Razorpay           │
<br>
│                                                          │
<br>
│  Middleware: authMiddleware + rateLimiter                 │
<br>
└──────────────────────┬──────────────────────────────────┘
<br>
                       │
┌──────────────────────▼──────────────────────────────────┐
<br>
│                    MongoDB Atlas                          │
<br>
│         Users | Websites | Payments Collections          │
<br>
└─────────────────────────────────────────────────────────┘

🔐 Security Implementation


✅ HTTP-Only Cookies — JWT stored in httpOnly cookies, inaccessible to JavaScript (XSS protection)
<br>
✅ Secure + SameSite Flags — Cookies only sent over HTTPS, CSRF protected
<br>
✅ Rate Limiting — Different limits per route (auth: 10/15min, payments: 5/hr, generate: 20/hr)
<br>
✅ Razorpay Signature Verification — HMAC-SHA256 cryptographic verification on every payment
<br>
✅ Protected Routes — authMiddleware validates JWT on every protected API call
<br>
✅ CORS Configuration — Restricted to frontend domain only
<br>
✅ Filtered API Responses — Sensitive fields never sent to client
<br>


👩‍💻 Author

Palak Verma


🎓 B.Tech CSE, CSJM University Kanpur (2024–2028)
💼 Full Stack MERN Developer
🔗GitHub-- https://github.com/PalakVerma-code

