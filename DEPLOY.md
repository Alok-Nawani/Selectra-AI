# 🚀 Deploying Selectra AI (100% Free)

Follow these steps to make your project live and shareable for your resume!

## 1. Backend (Render.com)
Render provides free hosting for Node.js backends.

1. Create a free account at [Render.com](https://render.com).
2. Click **New +** > **Web Service** and connect your GitHub.
3. Select this repository.
4. **Configuration**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. **Environment Variables**:
   In the "Environment" tab, manually add these variables (values from your local `.env`):
   - `GEMINI_API_KEYS`
   - `HF_TOKEN`
   - `DEEPGRAM_KEY`
   - `OPENAI_COMPATIBLE_KEY`
   - `PORT`: `10000` (Render's default)

## 2. Frontend (Vercel)
Vercel is the best for hosting high-speed frontends.

1. Create a free account at [Vercel.com](https://vercel.com).
2. Click **Add New** > **Project** and select this repository.
3. **Configuration**:
   - **Root Directory**: (Leave blank)
   - **Framework Preset**: `Other`
   - **Build Settings**: (Leave blank)
4. Click **Deploy**.

## 3. Connecting Frontend to Backend
Once your **Render Backend** is live, it will give you a URL like `https://selectra-backend.onrender.com`.

1. Open `frontend/js/config.js` (locally).
2. Update the `BACKEND_URL` to your new Render link.
3. Commit and Push to GitHub.
4. Vercel will automatically update the site!

---
**Note:** On the free tier, "Render" services spin down after 15 mins of inactivity. The first request after a break might take ~40 seconds to respond. This is normal for free hosting.
