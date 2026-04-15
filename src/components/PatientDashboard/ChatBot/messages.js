export const messages = {
  welcome: {
    text: "Hello there! 👋 I'm your mental health companion. I'm here to listen, support, and help you navigate through difficult moments. Everything you share stays confidential.",
    next: "mood"
  },
  
  mood: {
    text: "Let's start with how you're feeling right now. On a scale from 0 to 10, where 0 means extremely distressed and 10 means completely at peace, where would you place yourself?",
    type: "input",
    next: "riskCheck"
  },

  riskCheck: {
    text: "Thank you for sharing that. I want to check in about your safety: Have you had any thoughts about harming yourself recently?",
    options: ["Yes, I have", "No, I haven't"]
  },

  highRisk: {
    text: "I'm deeply concerned about what you're experiencing right now. You're in significant emotional pain, and it's crucial to connect with immediate professional support.",
    emergency: true
  },

  mediumRisk: {
    text: "Thank you for being honest with me. Let's pause for a moment and breathe together... Inhale slowly for 4 seconds... hold... exhale for 6 seconds... How does that feel?",
    next: "counselor"
  },

  lowRisk: {
    text: "I'm glad you reached out today. Acknowledging your feelings is an important first step. Would you like to try a quick mindfulness exercise together?",
    next: "followUp"
  },

  counselor: {
    text: "Professional support can make a significant difference. Would you like me to help you connect with a licensed mental health professional?",
    options: ["Yes, connect me", "Not right now"]
  },

  followUp: {
    text: "Consistent support matters. I can arrange gentle daily check-ins if that would be helpful for you. Remember, healing is a journey, not a destination 🌿",
    next: "resources"
  },

  resources: {
    text: "Here are some supportive resources: guided meditation links, breathing exercise videos, mental health articles, and local support group information."
  }
};