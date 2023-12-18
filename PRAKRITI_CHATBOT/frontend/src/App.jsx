import React, { useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const appendMessage = (role, text) => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
  };

  const sendMessage = () => {
    if (!userMessage) return;
    appendMessage("User", userMessage);

    fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.messages) {
          data.messages.forEach((message) => {
            appendMessage("Bot", message.text);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setUserMessage("");
  };

  return (
    <div style={{padding:'20px'}} className="">
      <h1>Prakriti Chatbot</h1>
      <div
      className="input-box"
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          height: "300px",
          borderRadius:'10px',
          overflowY:'scroll'
        }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message"
          style={{ width: "80%", padding: "15px",borderRadius:'5px' }}
        />
        <button
          onClick={sendMessage}
          style={{ width: "12%", padding: "14px", cursor: "pointer",borderRadius:'5px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
