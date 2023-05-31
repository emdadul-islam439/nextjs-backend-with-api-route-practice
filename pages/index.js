import { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  function submitFormHandler(event){
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;
  }
  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Submit Feedback</button>
      </form>
    </div>
  );
}

export default HomePage;
