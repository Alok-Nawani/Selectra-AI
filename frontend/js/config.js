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
            const response = await fetch('http://localhost:5001/api/config');
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
