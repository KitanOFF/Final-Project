const { ChatWithAI } = require("./aiSystem")

const handleChatRequest = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    const result = await ChatWithAI(prompt);

    if (result.success) {
      return res.json({
        success: true,
        answer: result.answer,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "AI is out of work, please try again in 5 minutes.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = { handleChatRequest };
