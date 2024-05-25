import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdAdd, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const MedicationForm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [medication, setMedication] = useState({
    token: sessionStorage.getItem("token"),
    medicineName: "",
    type: "",
    dosage: "",
    days: new Array(7).fill(false),
    time: "",
  });

  const [time, setTime] = useState(new Date());

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleMedicationChange = (e) => {
    const { name, value } = e.target;
    setMedication({ ...medication, [name]: value });
  };

  const handleDayChange = (index) => {
    const updatedDays = [...medication.days];
    updatedDays[index] = !updatedDays[index];
    setMedication({ ...medication, days: updatedDays });
  };

  const handleTimeChange = (time) => {
    setTime(time);
    setMedication({ ...medication, time: time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date(medication.time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const transformedTime = `${hours}:${minutes}`;
    const updatedMedication = { ...medication, times: transformedTime };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/medication/addMedication`,
        updatedMedication
      );

      if (response) {
        toast.success("Medication Saved Successfully!", { autoClose: 2000 });
        setMedication({
          token: sessionStorage.getItem("token"),
          medicineName: "",
          type: "",
          dosage: "",
          days: new Array(7).fill(false),
          time: ""
        });
        setTime(new Date());
      } else {
        toast.error("Please Try Again", { autoClose: 2000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Please Try Again", { autoClose: 2000 });
    }
  };


  return (
    <div className="min-h-[100vh] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <h1 className="select-none text-4xl lg:text-7xl pt-[4%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
        Medication Detail
      </h1>

      <div className="flex justify-center mt-8 lg:mt-20 p-7">
        <div className="w-[630px] h-fit border border-white rounded-[30px] bg-black p-10">
          <form onSubmit={handleSubmit}>
            <label className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]">
              Medicine Name
            </label>
            <input
              type="text"
              name="medicineName"
              value={medication.medicineName}
              onChange={handleMedicationChange}
              className="block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-2 py-3 placeholder:uppercase uppercase placeholder:tracking-[2px] placeholder:text-sm "
              placeholder="Name"
              required
            />

            <div className="mt-[8%]">
              <label className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]">
                Type
              </label>
              <select
                name="type"
                value={medication.type}
                onChange={handleMedicationChange}
                className="block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm tracking-[1px] uppercase"
                required
              >
                <option value="" className="text-black">
                  TYPE
                </option>
                <option value="Powder" className="text-black">
                  Powder
                </option>
                <option value="Syrup" className="text-black">
                  Syrup
                </option>
                <option value="Tablet" className="text-black">
                  Tablet
                </option>
              </select>
            </div>

            <div className="mt-[8%]">
              <label className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]">
                Day
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {daysOfWeek.map((day, index) => (
                  <label
                    key={index}
                    className="inline-flex items-center mt-3 mr-3"
                  >
                    <input
                      type="checkbox"
                      value={day}
                      checked={medication.days[index]}
                      onChange={() => handleDayChange(index)}
                      className="form-checkbox h-5 w-5 text-gray-600"
                    />
                    <span className="ml-2 text-white uppercase tracking-[2px]">
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-baseline mt-[8%]">
              <label className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]">
                Time
              </label>
              <div className="flex gap-2 items-center">
                <DatePicker
                  selected={time}
                  onChange={(newTime) => handleTimeChange(newTime)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeFormat="HH:mm"
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  className="block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-3 py-2 placeholder:uppercase placeholder:tracking-[2px] placeholder:text-sm"
                  required
                />
              </div>
            </div>

            <div className="mt-[8%]">
              <label className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]">
                Dosage
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  name="dosage"
                  value={medication.dosage}
                  onChange={handleMedicationChange}
                  className="block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm"
                  required
                />
              </div>
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

export default MedicationForm;
