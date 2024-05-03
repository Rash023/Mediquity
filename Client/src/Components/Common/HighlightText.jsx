import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;