import React, { useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BookDoctor = () => {
  const [patientName, setPatientName] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [slotTiming, setSlotTiming] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigate = useNavigate();

  const specialistOptions = [
    "Anesthesiology",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "Hematology",
    "Infectious Disease",
    "Internal Medicine",
    "Neurology",
    "Neurosurgery",
    "Obstetrics and Gynecology (OB/GYN)",
    "Oncology",
    "Ophthalmology",
    "Orthopedic Surgery",
    "Otolaryngology (ENT)",
    "Pediatrics",
    "Physical Medicine and Rehabilitation",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
  ];

  const handlePatientNameChange = (e) => {
    setPatientName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSpecialistChange = (e) => {
    setSpecialist(e.target.value);
  };

  const handleSlotTimingChange = (e) => {
    setSlotTiming(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/get-doctor/${specialist}`);
  };

  return (
    <div className="min-h-[100vh] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <h1 className="select-none text-4xl lg:text-7xl pt-[4%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
        Book Appointment
      </h1>

      <div className="flex justify-center mt-8 lg:mt-20 p-7">
        <div className="w-[630px] h-fit border border-white rounded-[30px] bg-black p-10">
          <form onSubmit={handleSubmit} className="gap-y-2">
            <div>
              <label className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={handlePatientNameChange}
                className="block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-2 py-3 placeholder:uppercase uppercase placeholder:tracking-[2px] placeholder:text-sm "
                placeholder="Patient Name"
                required
              />
            </div>

            <div className="lg:mt-[4%] mt-[10%]">
              <label className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]">
                Description
              </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-2 py-3 placeholder:uppercase uppercase placeholder:tracking-[2px] placeholder:text-sm "
                placeholder="Description"
                required
              />
            </div>

            <div className="lg:mt-[4%] mt-[10%]">
              <label className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]">
                Specialist
              </label>
              <select
                value={specialist}
                onChange={handleSpecialistChange}
                className="block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm tracking-[1px] uppercase"
                required
              >
                <option value="" className="text-black">
                  Type
                </option>
                {specialistOptions.map((option, index) => (
                  <option key={index} value={option} className="text-black">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-b from-neutral-200 to-neutral-600 rounded-lg py-2 px-4 mt-4 uppercase tracking-[2px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookDoctor;

