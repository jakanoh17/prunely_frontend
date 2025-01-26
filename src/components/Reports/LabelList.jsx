import React from "react";

const LabelList = ({ data }) => {
  const [savedLabels, setSavedLabels] = usestate([]);

  return (
    <div style={{ padding: "0 20px" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <h3 style={{ margin: "0 0 5px 0" }}>{item.name}</h3>
              <p style={{ margin: "0", color: "black" }}>
                Time: {secondsToHms(item.overallTime)}
              </p>
            </div>
            <p style={{ margin: 0 }}>
              Created on:{" "}
              {new Date(item.created).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabelList;
