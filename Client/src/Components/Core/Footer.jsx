import React from "react";
import { useNavigate } from "react-router-dom";
import { FooterContent } from "./FooterContent";
export function Footer() {
  const Navigate = useNavigate();

  return (
    <div className="w-fit flex text-white">
      <div className="px-5 select-none">Copyright 2024 Mediquity</div>
      <div className="  flex text-white ">
        <FooterContent title={"Home"} tag={false} path="/" />
        <FooterContent title="About" tag={true} path="/about" />
        <FooterContent title="Contact" tag={true} path="contact" />
        <FooterContent title="Contributors" tag={true} path="/" />

        <FooterContent title="Github" tag={true} path="/" />
      </div>
      <div className="h-8"></div>
    </div>
  );
}
