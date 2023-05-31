import { useRef, useState } from "react";

function HomePage() {
  const [loadedFeedbacks, setLoadedFeedbacks] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function getAllFeedbacks() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoadedFeedbacks(data.feedback);
      });
  }

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;

    const requestBody = { email: enteredEmail, feedback: feedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <h1>Home Page</h1>

      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Submit Feedback</button>
      </form>

      <hr />

      <button onClick={getAllFeedbacks}>Get Feedbacks</button>
      <ul>
        {loadedFeedbacks.map((feedback) => (
          <li key={feedback.id}>{feedback.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
