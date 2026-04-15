import React, { useState, useEffect, useRef } from "react";
import { messages } from "./messages";
import "./chatbot.css";

const MentalHealthChatbot = () => {
  const [chatHistory, setChatHistory] = useState([
    { 
      id: 1,
      sender: "bot", 
      text: messages.welcome.text,
      timestamp: new Date()
    }
  ]);
  const [currentStep, setCurrentStep] = useState("welcome");
  const [userMood, setUserMood] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showSafetyResources, setShowSafetyResources] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textInputRef = useRef(null);
  const messageIdCounter = useRef(2);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, showTypingIndicator]);

  // Focus text input always
  useEffect(() => {
    textInputRef.current?.focus();
  }, [currentStep]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addChatMessage = (sender, messageText) => {
    const newMessage = {
      id: messageIdCounter.current++,
      sender,
      text: messageText,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const simulateBotResponse = (responseText, delay = 800) => {
    setShowTypingIndicator(true);
    return new Promise(resolve => {
      setTimeout(() => {
        addChatMessage("bot", responseText);
        setShowTypingIndicator(false);
        resolve();
      }, delay);
    });
  };

  const handleMoodInput = async (inputValue) => {
    const numericMood = Number(inputValue);

    if (numericMood < 0 || numericMood > 10 || isNaN(numericMood)) {
      addChatMessage("bot", "Please enter a valid number between 0 and 10");
      return;
    }

    setUserMood(numericMood);
    addChatMessage("user", `My current mood is ${numericMood}/10`);
    setUserMessage("");

    setShowTypingIndicator(true);
    setTimeout(async () => {
      setShowTypingIndicator(false);

      if (numericMood <= 3) {
        await simulateBotResponse("I hear how much pain you're in right now. That sounds incredibly difficult to bear.");
        await simulateBotResponse("Your feelings are valid, and you don't have to go through this alone.");
        await simulateBotResponse(messages.riskCheck.text);
        setCurrentStep("riskCheck");
      }
      else if (numericMood <= 6) {
        await simulateBotResponse("Thank you for sharing that. It sounds like you're experiencing some significant challenges.");
        await simulateBotResponse(messages.riskCheck.text);
        setCurrentStep("riskCheck");
      }
      else {
        await simulateBotResponse("I appreciate you checking in. It's good to hear you're managing okay.");
        await simulateBotResponse("Even when we're doing relatively well, it's important to maintain our mental wellness.");
        await simulateBotResponse(messages.lowRisk.text);
        setCurrentStep("lowRisk");
      }
    }, 1200);
  };

  const handleYesNoResponse = async (response) => {
    addChatMessage("user", response);
    setUserMessage("");

    if (currentStep === "riskCheck") {
      if (response.toLowerCase().includes("yes")) {
        await simulateBotResponse(messages.highRisk.text);
        await simulateBotResponse("Your safety is the most important thing right now. You deserve support and care.");
        setCurrentStep("highRisk");
        setShowSafetyResources(true);
      } else {
        await simulateBotResponse(messages.mediumRisk.text);
        await simulateBotResponse("Let's try another grounding technique: Notice 4 things you can feel right now...");
        setTimeout(async () => {
          await simulateBotResponse("How did that feel? Sometimes bringing attention to our senses can help anchor us.");
          await simulateBotResponse(messages.counselor.text);
          setCurrentStep("counselor");
        }, 2000);
      }
    }
    else if (currentStep === "counselor") {
      if (response.toLowerCase().includes("yes")) {
        await simulateBotResponse("That's a brave and important decision. Professional support can provide tools and strategies tailored to your needs.");
        await simulateBotResponse("I'm gathering some resources for you...");
        setCurrentStep("resources");
      } else {
        await simulateBotResponse("I respect your decision. I'm here whenever you feel ready.");
        await simulateBotResponse("Remember: reaching out when you need help is a sign of strength, not weakness.");
        setCurrentStep("followUp");
      }
    }
    else if (currentStep === "lowRisk") {
      if (response.toLowerCase().includes("yes")) {
        await simulateBotResponse("Great! Let's do a 5-4-3-2-1 grounding exercise:");
        await simulateBotResponse("Find 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.");
        await simulateBotResponse("How did that exercise feel for you?");
        setCurrentStep("followUp");
      } else {
        await simulateBotResponse("That's completely okay. Everyone's journey is different.");
        await simulateBotResponse("Small, consistent self-care practices often make the biggest difference over time.");
        setCurrentStep("followUp");
      }
    }
    else if (currentStep === "followUp") {
      if (response.toLowerCase().includes("yes")) {
        await simulateBotResponse("I'll send you gentle daily check-ins. This can help you stay connected with your emotional wellbeing.");
        await simulateBotResponse("Remember, I'm always here when you need to talk.");
        setTimeout(() => {
          restartConversation();
        }, 2000);
      } else {
        await simulateBotResponse("Understood. Remember that seeking help is a sign of strength, not weakness.");
        await simulateBotResponse("Take care of yourself, and I'll be here whenever you need support.");
        setTimeout(() => {
          restartConversation();
        }, 2000);
      }
    }
  };

  const handleTextMessageSubmit = () => {
    if (!userMessage.trim()) return;

    if (currentStep === "welcome") {
      addChatMessage("user", userMessage);
      setUserMessage("");
      setTimeout(async () => {
        await simulateBotResponse(messages.mood.text);
        setCurrentStep("mood");
      }, 800);
    } 
    else if (currentStep === "mood") {
      handleMoodInput(userMessage);
    } else if (["riskCheck", "counselor", "lowRisk", "followUp"].includes(currentStep)) {
      handleYesNoResponse(userMessage);
    } else {
      // Free text conversation
      addChatMessage("user", userMessage);
      setUserMessage("");

      setTimeout(() => {
        const responses = [
          "Thank you for sharing that with me. How does expressing that make you feel?",
          "I hear what you're saying. Would you like to explore that feeling more?",
          "That sounds significant. Tell me more about what that's like for you.",
          "I'm listening. What's the most challenging part of that for you?",
          "Thank you for being open with me. How have you been coping with this?",
          "I appreciate you sharing this. Remember that your feelings are always valid."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage("bot", randomResponse);
      }, 1000);
    }
  };

  const restartConversation = () => {
    setChatHistory([{ 
      id: 1,
      sender: "bot", 
      text: messages.welcome.text,
      timestamp: new Date()
    }]);
    setCurrentStep("welcome");
    setUserMood(null);
    setShowSafetyResources(false);
    setUserMessage("");
    messageIdCounter.current = 2;
  };

  const getInputPlaceholder = () => {
    switch (currentStep) {
      case "welcome":
        return "Type your response here...";
      case "mood":
        return "Enter a number from 0-10 (0=Distressed, 10=At Peace)...";
      case "riskCheck":
        return "Type 'yes' or 'no'...";
      case "counselor":
        return "Type 'yes' to connect or 'no' for later...";
      case "lowRisk":
        return "Type 'yes' to try mindfulness or 'no' for later...";
      case "followUp":
        return "Type 'yes' for check-ins or 'no' to decline...";
      default:
        return "Type your thoughts here...";
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderCurrentStepGuide = () => {
    switch (currentStep) {
      case "mood":
        return (
          <div className="mindchat-step-guide">
            <div className="mindchat-mood-guide">
              <div className="mindchat-scale">
                <span className="mindchat-scale-left">0 - Distressed</span>
                <span className="mindchat-scale-middle">5 - Neutral</span>
                <span className="mindchat-scale-right">10 - At Peace</span>
              </div>
              <p className="mindchat-instruction">
                Enter a number between 0 and 10
              </p>
            </div>
          </div>
        );
      
      case "riskCheck":
        return (
          <div className="mindchat-step-guide">
            <div className="mindchat-question-guide">
              <p className="mindchat-question">
                Have you had thoughts about harming yourself?
              </p>
              <p className="mindchat-hint">
                Please be honest. Your safety is our priority.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mindchat-wrapper">
      <div className="mindchat-container">

        {/* Chat Header */}
        <div className="mindchat-header">
          <div className="mindchat-header-content">
            <div className="mindchat-logo">
              <span className="mindchat-logo-icon">🌿</span>
            </div>
            <div className="mindchat-titles">
              <h3 className="mindchat-title">MindCare Companion</h3>
              <p className="mindchat-subtitle">Confidential Support • 24/7 Available</p>
            </div>
          </div>
          <button
            className="mindchat-restart-btn"
            onClick={restartConversation}
            aria-label="Start new conversation"
          >
            <span className="mindchat-restart-icon">🔄</span>
            <span className="mindchat-restart-text">New Chat</span>
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="mindchat-messages-area" ref={chatContainerRef}>
          <div className="mindchat-messages">
            {chatHistory.map((message) => (
              <div
                key={`msg-${message.id}`}
                className={`mindchat-message mindchat-${message.sender}`}
              >
                {message.sender === "bot" && (
                  <div className="mindchat-bot-icon">🤖</div>
                )}
                <div className="mindchat-message-content">
                  <div className="mindchat-message-text">
                    {message.text}
                  </div>
                  <div className="mindchat-message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                {message.sender === "user" && (
                  <div className="mindchat-user-icon">👤</div>
                )}
              </div>
            ))}

            {/* Bot Typing Indicator */}
            {showTypingIndicator && (
              <div className="mindchat-typing">
                <div className="mindchat-bot-icon">🤖</div>
                <div className="mindchat-typing-dots">
                  <div className="mindchat-dot"></div>
                  <div className="mindchat-dot"></div>
                  <div className="mindchat-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Section */}
        <div className="mindchat-input-area">

          {/* Current Step Guidance */}
          {renderCurrentStepGuide()}

          {/* Emergency Resources Section */}
          {currentStep === "highRisk" && showSafetyResources && (
            <div className="mindchat-emergency">
              <div className="mindchat-emergency-header">
                <span className="mindchat-warning-icon">⚠️</span>
                <h4 className="mindchat-emergency-title">Immediate Support Required</h4>
                <p className="mindchat-emergency-subtitle">Your safety is our highest priority</p>
              </div>

              <div className="mindchat-hotlines">
                <div className="mindchat-hotline">
                  <div className="mindchat-hotline-icon">📞</div>
                  <div className="mindchat-hotline-info">
                    <h5 className="mindchat-hotline-name">AASRA Suicide Prevention</h5>
                    <p className="mindchat-hotline-number">9820466726</p>
                    <p className="mindchat-hotline-desc">24/7 confidential support</p>
                  </div>
                </div>

                <div className="mindchat-hotline">
                  <div className="mindchat-hotline-icon">🌐</div>
                  <div className="mindchat-hotline-info">
                    <h5 className="mindchat-hotline-name">KIRAN Mental Health</h5>
                    <p className="mindchat-hotline-number">1800-599-0019</p>
                    <p className="mindchat-hotline-desc">Toll-free national helpline</p>
                  </div>
                </div>

                <div className="mindchat-hotline">
                  <div className="mindchat-hotline-icon">🚨</div>
                  <div className="mindchat-hotline-info">
                    <h5 className="mindchat-hotline-name">Emergency Services</h5>
                    <p className="mindchat-hotline-number">112 / 108</p>
                    <p className="mindchat-hotline-desc">Immediate medical response</p>
                  </div>
                </div>
              </div>

              <div className="mindchat-safety-note">
                <p className="mindchat-safety-message">
                  <span className="mindchat-heart">💚</span>
                  You matter. Your life matters. Please reach out right now.
                </p>
              </div>
            </div>
          )}

          {/* Single Text Input */}
          <div className="mindchat-input-wrapper">
            <input
              type="text"
              placeholder={getInputPlaceholder()}
              className="mindchat-input"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && userMessage.trim()) {
                  handleTextMessageSubmit();
                }
              }}
              ref={textInputRef}
              autoFocus
            />
            <button
              className="mindchat-send-button"
              onClick={handleTextMessageSubmit}
              disabled={!userMessage.trim()}
            >
              <span className="mindchat-send-icon">📤</span>
              Send
            </button>
          </div>

          {/* Footer Notice */}
          

        </div>
      </div>
    </div>
  );
};

export default MentalHealthChatbot;