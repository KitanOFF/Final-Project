import React from "react";
import { useNavigate } from "react-router-dom";
import "./AiButton.css";

function AiButton() {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/Ai");
  };

  return (
   <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={goToChat} className="chat-button-ai">
        ✦ Chat with AI <span className="close-x"></span>
      </button>
    </div>
  );
}
export default AiButton