const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai"); //
const path = require('path');

const app = express();
const PORT = 3000;

// 1. MIDDLEWARE: Allows server to read JSON and find your 'public' folder
app.use(express.json()); //
app.use(express.static('public')); //

// 2. AI CONFIGURATION: Replace with your actual key from Google AI Studio
const genAI = new GoogleGenerativeAI(gemini_api_key = "AIzaSyB0EG1b6DeBXPBgx-kTOvtOXFidYxjuueQ"); //
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: `CORE ROLE: You are "BHARAT_LEGAL_CORE", an expert assistant specialized ONLY in the Constitution of India and Indian Laws (IPC, CrPC, IEA, etc.).
        
        STRICT RULES:
        1. Only answer queries related to Indian Law, legal procedures, or the Constitution of India.
        2. If a user asks about any other topic (science, math, general news, laws of other countries, etc.), you MUST politely decline.
        3. Use a formal, futuristic legal assistant tone.
        4. Always state that your responses are for informational purposes and not official legal advice.
        5. If a query is ambiguous, ask for the specific section or legal context within the Indian legal system.`
});

// 3. THE CHAT ROUTE: This talks to your script.js and the Gemini AI
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body; //

        // Generate a real response using the Gemini model
        const result = await model.generateContent(message);
        const responseText = result.response.text();

        // Send the AI's answer back to the frontend
        res.json({ reply: responseText });

    } catch (error) {
        console.error("AI ERROR:", error);
        res.status(500).json({ reply: "SYSTEM_ERROR: Neural link disrupted. Please check API key." });
    }
});

// 4. START THE ENGINE
app.listen(PORT, () => {
    console.log(`
    ==================================================
    NEURAL LINK ESTABLISHED
    Access Terminal: http://localhost:${PORT}
    ==================================================
    `);
});