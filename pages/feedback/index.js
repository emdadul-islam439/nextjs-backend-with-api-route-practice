import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";

function FeedbackPage(props) {
  const [loadedFeedback, setLoadedFeedback] = useState();
  function loadFeedbackHandler(feedbackId) {
    console.log("loadedFeedbackhandler: " + feedbackId);
    fetch(`/api/feedback/${feedbackId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: " + JSON.stringify(data));
        setLoadedFeedback(data.feedback);
      });
  }
  return (
    <Fragment>
      {loadedFeedback && <p>{loadedFeedback.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            feedback: {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default FeedbackPage;

export async function getStaticProps(context) {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  console.log("data: " + JSON.stringify(data));
  return {
    props: {
      feedbackItems: data,
    },
  };
}
