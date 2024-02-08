import React from "react";
import { BackgroundBeams } from "../../UI/BackgroundBeam.tsx";
import { SymptomData } from "../../../Util/SymptomData";

const DiseasePredictor = () => {
  return (
    <div className="h-[150vh] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-lg  md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mt-[1%]">
          Disease Predictor
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center tracking-[1px]">
          Welcome to <span className="uppercase font-bold">Mediquity</span>,
          your premier platform for brain tumor detection. We offer
          state-of-the-art solutions tailored to accurately detect brain tumors.
          Whether you need reliable diagnostic reports, scalable imaging
          solutions, or customizable treatment plans,{" "}
          <span className="uppercase font-bold">Mediquity</span> is your trusted
          partner!
        </p>

        <div className="mx-auto flex flex-col py-10 mt-[10%]">
          <div className="flex flex-col gap-y-7">
            {SymptomData.map((_, index) => (
              <div className="text-center flex gap-x-10" key={index}>
                <div className="text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  font-sans font-bold uppercase tracking-[1px] mt-[3%] ">
                  Symptom {index}
                </div>
                <select className="w-[573px] h-[80px] border rounded-[20px] bg-transparent border-neutral-300"></select>
              </div>
            ))}
          </div>
        </div>
        <div className="uppercase w-[176px] h-[56px] leading-[24px] text-[30px] tracking-[0.1px] bg-gradient-to-b from-neutral-200 to-neutral-600 border-[#000000] rounded-[15px] font-bold text-center mt-[6%] px-[20px] py-[12px]">
          PREDICT
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default DiseasePredictor;
