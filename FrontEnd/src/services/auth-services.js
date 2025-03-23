export const handleInput = (e, index, inputRefs) => {
  if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
    inputRefs.current[index + 1].focus();
  }
};

export const handleKeyDown = (e, index, inputRefs) => {
  if (e.key === "Backspace" && e.target.value === "" && index > 0) {
    inputRefs.current[index - 1].focus();
  }
};
