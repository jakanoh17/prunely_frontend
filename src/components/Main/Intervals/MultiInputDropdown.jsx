import { useState } from "react";

const MultiInputDropdown = ({ selectedInputs, setSelectedInputs }) => {
  const [inputTagValue, setInputTagValue] = useState("");
  const [suggestions, setSuggestions] = useState([
    "React",
    "JavaScript",
    "Node.js",
    "Express",
    "HTML",
    "CSS",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tagColorIndex, setTagColorIndex] = useState(0);

  const tagColors = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputTagValue(value);

    if (value) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions);
    }
  };

  const handleInputFocus = () => {
    setDropdownVisible(true);
    setFilteredSuggestions(suggestions);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdownVisible(false), 150); // Delay to allow click events on suggestions
  };

  const handleSuggestionClick = (suggestion) => {
    if (!selectedInputs.includes(suggestion)) {
      setSelectedInputs([...selectedInputs, suggestion]);
    }
    setInputTagValue("");
    setDropdownVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputTagValue.trim() !== "") {
      if (!selectedInputs.includes(inputTagValue.trim())) {
        setSelectedInputs([
          ...selectedInputs,
          { text: inputTagValue.trim(), bkgdColor: tagColors[tagColorIndex] },
        ]);
        changeTagColor();
      }
      setInputTagValue("");
      setDropdownVisible(false);
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedInputs(selectedInputs.filter((item) => item.text !== tag.text));
  };

  function changeTagColor() {
    if (tagColorIndex < tagColors.length - 1) {
      const newIndex = tagColorIndex + 1;
      setTagColorIndex(newIndex);
    } else {
      setTagColorIndex(0);
    }
  }

  return (
    <div className="dropdown-label">
      {/* Selected Inputs (Tags/Chips) */}
      <div className="dropdown-label__container">
        {selectedInputs.map((tag, index) => (
          <div
            style={{
              backgroundColor: `var(--tag-color-${tag.bkgdColor})`,
            }}
            className="dropdown-label__tag"
            key={index}
          >
            {tag.text}
            <span
              className="dropdown-label__del-btn"
              onClick={() => handleRemoveTag(tag)}
            >
              &times;
            </span>
          </div>
        ))}
        {/* Text Input */}
        <input
          type="text"
          value={inputTagValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder="Type something and press Enter..."
          className="dropdown-label__input"
        />
      </div>

      {/* Dropdown Suggestions */}
      {dropdownVisible && filteredSuggestions.length > 0 && (
        <ul className="dropdown-label__list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              className="dropdown-label__list-item"
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiInputDropdown;
