import path from "path";
import fs from "fs";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Created!" });
  } else {
    res.status(200).json({ message: "All is well" });
  }
}

export default handler;
