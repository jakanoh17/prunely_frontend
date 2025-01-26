import { useState } from "react";
import StudySessionInput from "./StudySessionInput";

export default function StudySession({ elapsedTimesObjs, api, token }) {
  const [formTitle, setFormTitle] = useState("");
  const [intervalsFormInputs, setIntervalsFormInputs] = useState({});

  const handleFormTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let overallTime = 0;
    const keys = Object.keys(intervalsFormInputs);

    for (let i = 0; i < keys.length; i++) {
      overallTime += intervalsFormInputs[keys[i]].elapsedTime;
    }

    api
      .saveStudySession(token, {
        sessionName: formTitle,
        intervals: intervalsFormInputs,
        overallTime,
      })
      .then(() => {
        alert("You're session has been saved!");
      })
      .catch(console.error);
  };

  const disableEnterBtnSubmission = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
    }
  };

  return elapsedTimesObjs[0] ? (
    <form
      className="study-session"
      onSubmit={handleSubmit}
      onKeyDown={disableEnterBtnSubmission}
    >
      <div className="study-session__top">
        <input
          className="study-session__title"
          type="text"
          name="title"
          value={formTitle}
          onChange={handleFormTitleChange}
          placeholder="Enter title of study session..."
        />
        <button className="study-session__submit-btn" type="submit">
          Save Session
        </button>
      </div>
      <ol className="study-session__time-intervals-list">
        {elapsedTimesObjs.map((timeObj) => {
          return (
            <li key={timeObj.id} className="study-session__time-interval">
              <StudySessionInput
                timeObj={timeObj}
                setFormInputs={setIntervalsFormInputs}
                formInputs={intervalsFormInputs}
              />
            </li>
          );
        })}
      </ol>
    </form>
  ) : (
    ""
  );
}
