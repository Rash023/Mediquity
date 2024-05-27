import React from "react";
import { useNavigate } from "react-router-dom";

export function FooterContent(props) {
  const Navigate = useNavigate();

  return (
    <div className="flex select-none">
      {props.tag ? <p className="text-center px-2">|</p> : null}
      <a
        href={props.path}
        className="text-center hover:text-blue-200 select-none"
      >
        {props.title}
      </a>
    </div>
  );
}
