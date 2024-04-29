import React from "react";
import "./Provide.css";
import ProvideCard from "./ProvideCard";
import { ProvideCardData } from "../../Util/ProvideCardData";
const Provide = () => {
  return (
    <div className="provide-container">
      <div>
        <div className="text-center uppercase tracking-[2px] text-4xl font-[700] leading-[63px] text-[#000000] mb-[2%]">
          What We <span className="text-[#008E7B]">Provide ?</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 place-items-center">
          {ProvideCardData.map((provideCard) => (
            <ProvideCard data={provideCard} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Provide;
