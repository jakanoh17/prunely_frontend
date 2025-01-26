import { useRef, useEffect, useState } from "react";

const ResizableText = ({
  text,
  maxFontSize = 400,
  minFontSize = 12,
  className,
}) => {
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(maxFontSize); // Start at the largest size

  useEffect(() => {
    const resizeText = () => {
      const container = containerRef.current;
      if (!container) return;

      const maxWidth = container.offsetWidth;
      let newFontSize = maxFontSize;

      // Set to maxFontSize and adjust downward if too large
      container.style.fontSize = `${newFontSize}px`;
      while (container.scrollWidth > maxWidth && newFontSize > minFontSize) {
        newFontSize--;
        container.style.fontSize = `${newFontSize}px`;
      }

      // Adjust upward if there's extra space, but not beyond maxFontSize
      while (container.scrollWidth <= maxWidth && newFontSize < maxFontSize) {
        newFontSize++;
        container.style.fontSize = `${newFontSize}px`;
        if (container.scrollWidth > maxWidth) {
          newFontSize--; // Prevent overshooting
          container.style.fontSize = `${newFontSize}px`;
          break;
        }
      }

      setFontSize(newFontSize); // Save the final font size
    };

    resizeText();

    // Resize text whenever the window is resized
    window.addEventListener("resize", resizeText);
    return () => window.removeEventListener("resize", resizeText);
  }, [text, maxFontSize, minFontSize]); // Dependencies include font size range and text

  return (
    <p
      className={className}
      ref={containerRef}
      style={{
        fontSize: `${fontSize}px`,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {text}
    </p>
  );
};

export default ResizableText;
