const CONFIG = {
    // API Keys - Now fetched from backend for security
    HF_TOKEN: "",
    DEEPGRAM_KEY: "",
    OPENAI_COMPATIBLE_KEY: "",

    // Endpoints
    HF_MODEL: "mistralai/Mistral-7B-Instruct-v0.2",
    DEEPGRAM_URL: "wss://api.deepgram.com/v1/listen?smart_format=true&model=nova-2&language=en-US",

    // Function to load keys from backend
    async loadRemoteConfig() {
        try {
            // Environment Detection: Use localhost if running locally, otherwise use Render URL
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const backendBase = isLocal ? 'http://localhost:5001' : 'https://your-backend-name.onrender.com';

            console.log(`Connecting to backend at: ${backendBase}`);
            const response = await fetch(`${backendBase}/api/config`);
            const data = await response.json();
            this.HF_TOKEN = data.HF_TOKEN;
            this.DEEPGRAM_KEY = data.DEEPGRAM_KEY;
            this.OPENAI_COMPATIBLE_KEY = data.OPENAI_COMPATIBLE_KEY;
            console.log("Remote config loaded successfully.");
        } catch (e) {
            console.error("Failed to load remote config:", e.message);
        }
    }
};

// Auto-load on import
// Note: This is an async operation. Modules using keys should check if they are loaded.
CONFIG.loadRemoteConfig();

export default CONFIG;
