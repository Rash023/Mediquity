import React from "react";
import { HoverEffect } from "../UI/HoverEffect.tsx";
import { services } from "../../Util/Services.js";

const ServiceCard = ({ data }) => {
  return (
    <div className="flex flex-col text-center">
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b uppercase mt-[9%] from-neutral-200 to-neutral-500 py-8 tracking-[2px]">
        Services
      </p>
      <div className="max-w-5xl mx-auto px-8 -mt-[2%]">
        <HoverEffect items={services} />
      </div>
    </div>
  );
};

export default ServiceCard;
