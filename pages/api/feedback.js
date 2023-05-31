import path from "path";
import fs from "fs";

function handler(req, res) {
  function buildFeedbackPath() {
    return path.join(process.cwd(), "data", "feedback.json");
  }
  function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
  }
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Created!" });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json(data);
  }
}

export default handler;
