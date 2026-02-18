# API Recommendations for Selectra AI

To take Selectra AI to the next level, I recommend integrating the following **FREE** API keys:

## 1. Code Execution Engine
**Judge0 API**:
- **Why**: Allows you to compile and run code in 40+ languages securely.
- **Plan**: Free tier available (RapidAPI).
- **Usage**: Integrate in specific `arena.js` to replace the mock execution logic.

## 2. Generative AI (Chat & Hints)
**Hugging Face Inference API**:
- **Why**: Use open-source models (like StarCoder or Llama-2) for code generation, hints, and feedback.
- **Plan**: Free access token.
- **Usage**: Use for "AI Feedback" tab in Arena.

## 3. Resume Parsing & Matching
**Affinda API (Free Trial)** or **OpenAI (Free Tier)**:
- **Why**: Parse PDF resumes and match against JD.
- **Plan**: Affinda has a generous free tier.
- **Usage**: Use in `resume-analyzer` section.

## 4. Speech to Text (More robust)
**Google Cloud Speech-to-Text (Free Tier)**:
- **Why**: Browser Web Speech API is limited. Google STT is more accurate.
- **Plan**: 60 mins/month free.
- **Usage**: Enhance Mock Interview.

## 5. Web Search
**SerpApi (Google Search API)**:
- **Why**: Fetch latest interview experiences from GeeksForGeeks or LeetCode Discuss.
- **Plan**: 100 searches/month free.
