import { buildFeedbackPath, extractFeedback } from "./index";

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  console.log("data: " + JSON.stringify(data));
  const selectedFeedback = data.find((feedback) => feedback.id === feedbackId);
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
