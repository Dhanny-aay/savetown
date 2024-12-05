"use client";
import { useRef } from "react";

export default function CodeInputForm({
  code = Array(6).fill(""),
  onCodeChange,
}) {
  const inputsRef = useRef([]);

  const handleChange = (index, event) => {
    const { value } = event.target;

    if (value.length === 1) {
      // Update parent state
      const updatedCode = [...code];
      updatedCode[index] = value;
      onCodeChange(updatedCode);

      // Move focus to the next input
      const nextId = event.target.getAttribute("data-focus-input-next");
      if (nextId) {
        document.getElementById(nextId)?.focus();
      }
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = (event.clipboardData || window.clipboardData).getData(
      "text"
    );
    const digits = pasteData.replace(/\D/g, ""); // Extract only numbers

    if (digits.length > 0) {
      const updatedCode = [...code];
      digits.split("").forEach((digit, i) => {
        if (i < updatedCode.length) {
          updatedCode[i] = digit;
        }
      });

      // Update state and focus last filled input
      onCodeChange(updatedCode);
      const lastIndex = Math.min(digits.length, code.length) - 1;
      inputsRef.current[lastIndex]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    const { key } = event;

    if (key === "Backspace") {
      // Handle deletion
      const updatedCode = [...code];
      if (!code[index]) {
        // If current input is empty, move to the previous input
        const prevId = event.target.getAttribute("data-focus-input-prev");
        if (prevId) {
          document.getElementById(prevId)?.focus();
        }
      } else {
        // Clear the current input
        updatedCode[index] = "";
        onCodeChange(updatedCode);
      }
    }
  };

  return (
    <form className="flex items-center justify-center w-full mt-6">
      <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
        {Array.from({ length: 6 }, (_, index) => {
          const currentId = `code-${index + 1}`;
          const nextId = index < 5 ? `code-${index + 2}` : null;
          const prevId = index > 0 ? `code-${index}` : null;

          return (
            <div key={currentId}>
              <label htmlFor={currentId} className="sr-only">
                Code {index + 1}
              </label>
              <input
                type="text"
                maxLength="1"
                id={currentId}
                ref={(el) => (inputsRef.current[index] = el)}
                data-focus-input-init
                data-focus-input-prev={prevId}
                data-focus-input-next={nextId}
                className="block w-9 h-9 py-3 text-sm font-medium text-center text-gray-900 bg-white border border-[#5C5C5C] rounded-lg"
                value={code[index] || ""} // Default fallback to avoid undefined
                onChange={(e) => handleChange(index, e)}
                onPaste={handlePaste} // Handle paste
                onKeyDown={(e) => handleKeyDown(index, e)} // Handle backspace
                required
              />
            </div>
          );
        })}
      </div>
    </form>
  );
}
