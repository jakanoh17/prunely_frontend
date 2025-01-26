import { useState, useEffect } from "react";
import MultiInputDropdown from "./MultiInputDropdown";
import { secondsToHms } from "../../../utils/functions";

export default function StudySessionInput({
  timeObj,
  setFormInputs,
  formInputs,
}) {
  const [selectedLabelInputs, setSelectedLabelInputs] = useState([]);

  useEffect(() => {
    const copyOfFormInputs = JSON.parse(JSON.stringify(formInputs));
    copyOfFormInputs[timeObj.id] = {
      labels: selectedLabelInputs.text,
      elapsedTime: timeObj.elapsedTime,
    };
    setFormInputs(copyOfFormInputs);
  }, [selectedLabelInputs]);

  return (
    <>
      <MultiInputDropdown
        selectedInputs={selectedLabelInputs}
        setSelectedInputs={setSelectedLabelInputs}
      />
      <p className="study-session__elapsed-time">
        {secondsToHms(timeObj.elapsedTime)}
      </p>
    </>
  );
}
