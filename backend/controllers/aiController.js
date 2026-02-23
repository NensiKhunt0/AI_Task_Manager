const Groq = require('groq-sdk');

const suggestTasks = async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.json({
        suggestions: ["Review emails", "Plan goals", "Update docs", "Meeting", "Priority task"]
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = 'List 5 professional tasks for a productive day. Return ONLY the tasks, one per line, no numbers or bullets.';

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-8b-instant', // updated to current supported model
    });

    const aiText = response.choices[0]?.message?.content || "";

    const suggestions = aiText
      .split('\n')
      .map(line => line.replace(/^[\d\.\-\*\s]+/, '').trim())
      .filter(line => line.length > 0)
      .slice(0, 5);

    res.json({ suggestions });

  } catch (error) {
    console.error('Groq SDK Error:', error.message);
    res.status(500).json({
      message: 'AI suggestion failed',
      details: error.message
    });
  }
};

module.exports = { suggestTasks };