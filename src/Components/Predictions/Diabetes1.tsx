"use client";
import React, { useState } from "react";
import { Label } from "../UI/label.tsx";
import { Input } from "../UI/input.tsx";
import { Select, Option } from "../UI/select.jsx";

import { cn } from "../../Util/cn.ts";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { BackgroundBeams } from "../UI/BackgroundBeam.tsx";

export function DiabetesInputs() {
  const [selectedValue, setSelectedValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      <div>
        <h1 className="text-lg md:text-7xl mt-[5%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
          DIABETES PREDICTION
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-1 text-lg text-center tracking-[1px] font-ai">
          Welcome to{" "}
          <span className="uppercase font-bold floating-animation gemini-font">
            Pharmos
          </span>
          , your personalized Medicine Assistant. We specialize in providing
          support and guidance for individuals seeking assistance with
          medication management. Whether you're in need of dosage information,
          guidance on medication timing, or advice for all age groups,{" "}
          <span className="uppercase font-bold floating-animation gemini-font">
            Pharmos
          </span>{" "}
          is here for you every step of the way. The name Pharmos represents our
          commitment to pharmacy and personalized care.
        </p>

        <div className="max-w-md w-[130vh] mx-auto  md:rounded-2xl p-4 md:p-8 shadow-input mt-[4%]  border border-white rounded-[30px]">
          {/* <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Mediquity
      </h2> */}

          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">

          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"> */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="Age">Age</Label>
              <Input id="Age" placeholder="Enter the age" type="text" />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="Gender">Gender</Label>
              <Select id="gender" name="gender" onChange={handleChange} className="text-sm font-medium text-white dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <Option className="z-10" value="Male">Male</Option>
                <Option className="z-10" value="Female">Female</Option>
            </Select>
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="Hypertension">Hypertension</Label>
              <Select id="hypertension" name="hypertension" onChange={handleChange} className="text-sm font-medium text-white dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <Option  value="1">yes </Option>
                <Option value="0">no </Option>
            </Select>
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="Heart_disease">Heart_disease</Label>
              <Select id="heart_disease" name="heart_disease" onChange={handleChange} className="text-sm font-medium text-white dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <Option  value="1">yes </Option>
                <Option value="0">no </Option>
            </Select>
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="Smoking_history">Smoking_history</Label>
              <Select id="Smoking_history" name="Smoking_history" onChange={handleChange} className="text-sm font-medium text-white dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <Option value="0">no info</Option>
                <Option value="1">current</Option>
                <Option value="2">ever</Option>
                <Option value="3">former</Option>
                <Option value="3">not current</Option>
                <Option value="4">never</Option>
            </Select>
            </LabelInputContainer>
            {/* </div> */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="bmi">bmi</Label>
              <Input id="bmi" placeholder="Enter BMI Value (Float)" type="number" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="HbA1c_level"> HbA1c_level</Label>
              <Input id="HbA1c_level" placeholder="Enter HbA1c Level (Float)" type="password" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="blood_glucose_level">blood_glucose_level</Label>
              <Input
                id="blood_glucose_level"
                placeholder="Enter Blood Glucose level (Integer)"
                type="number"
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Predict &rarr;
              <BottomGradient />
            </button>


          </form>

        </div>
      </div>
      <BackgroundBeams className="-z-10 bg-black h-[150vh]" />
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
