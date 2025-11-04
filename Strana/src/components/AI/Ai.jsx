import React, { useState } from 'react';
import "./Ai.css";

function AIChatPanel() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setMessages((msgs) => [...msgs, { role: 'user', text: prompt }]);

    try {
     
      const res = await fetch('http://localhost:1000/api/v1/ai', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (data.success) {
        setMessages((msgs) => [...msgs, { role: 'ai', text: data.answer }]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          { role: 'ai', text: data.error || 'AI error' },
        ]);
      }
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { role: 'ai', text: 'Network error or server error.' },
      ]);
    }
    setPrompt('');
    setLoading(false);
  };

  return (
    <div className="login-root">
      <div className="left-panel">

  <img src="logo-3.1.png" className="full-bg" alt="Background" />
</div>
<div className="right-panel">
<div className="ai-chat-panel">
      <div className="ai-chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg-row ${m.role}`}>
            <img
              className="avatar"
              src={m.role === "user" ? "you-ai.png" : "astronau-mini.PNG"}
              alt={`${m.role} avatar`}
            />
            <div className="msg-bubble">
              <b>{m.role === "user" ? "You" : "AI"}:</b> {m.text}
              {m.imageUrl && (
                <img className="msg-image" src={m.imageUrl} alt="attachment" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="ai-chat-input">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
        />
        <input
          type="file"
          accept="image/*"
          // onChange={handleImageUpload}
          className="image-upload"
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default AIChatPanel;
