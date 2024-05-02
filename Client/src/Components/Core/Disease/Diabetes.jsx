import React, { useState } from 'react'
import { BsFillSearchHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiabetesPrediction = () => {
    const BASE_URL = process.env.REACT_APP_FLASK_URL;
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        hypertension: '',
        heart_disease: '',
        smoking_history: '',
        bmi: '',
        HbA1c_level: '',
        blood_glucose_level: ''
    });
    const [predictionResult, setPredictionResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const changeHandler = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        setFormData({ ...formData, [name]: processedValue });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/predict/diabetes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            setPredictionResult(data.result);
        } catch (error) {
            console.error(error);
            toast.error("Please Try Again");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-[100vh] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
            <h1 className="select-none text-4xl lg:text-7xl pt-[4%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
                DIABETES PREDICTION
            </h1>

            <p className="select-none text-neutral-500 max-w-lg mx-auto text-lg lg:text-[1.25rem] text-center tracking-[1px] font-ai p-3 lg:p-0">
                Greetings from{" "}
                <span className="uppercase font-bold floating-animation gemini-font">
                    DiaCheck
                </span>
                , your personal Diabetes Predictor . I specialize in providing
                support and guidance for individuals concerned about diabetes risk assessment. Whether you seek insights into blood sugar levels, risk factors assessment, or lifestyle modifications,{" "}
                <span className="uppercase font-bold floating-animation gemini-font">
                    DiaCheck
                </span>{" "}
                is here to assist you every step of the way. The name DiaCheck reflects our dedication to diabetes awareness and proactive health management.
            </p>


            <div className='flex justify-center mt-8 lg:mt-20 p-7'>
                <div className='w-[630px] h-fit border border-white rounded-[30px] bg-black p-10 '>
                    <form onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="age" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>Age</label>
                            <input type="text" placeholder='Enter Age' name='age' onChange={changeHandler} className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm' />
                        </div>

                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 mb-4 mt-8">
                            <div>
                                <label htmlFor="gender" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]'>Gender</label>
                                <div className='flex items-center'>
                                    <input type="radio" name='gender' className='block m-4  cursor-pointer' value="1" onChange={changeHandler} /><span className='text-neutral-500  select-none  tracking-[0.5px]'>Male</span>
                                </div>
                                <div className='flex items-center'>
                                    <input type="radio" name='gender' className='block m-4 cursor-pointer' value="0" onChange={changeHandler} /><span className='text-neutral-500   select-none tracking-[0.5px]'>Female</span>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="hypertension" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 uppercase text-xl lg:text-2xl select-none tracking-[1px]'>Hypertension</label>
                                <div className='flex items-center'>
                                    <input type="radio" name='hypertension' className='block m-4 cursor-pointer' value="1" onChange={changeHandler} /><span className='text-neutral-500  select-none  tracking-[0.5px]' >Yes</span>
                                </div>
                                <div className='flex items-center'>
                                    <input type="radio" name='hypertension' className='block m-4 cursor-pointer' value="0" onChange={changeHandler} /><span className='text-neutral-500  select-none  tracking-[0.5px]' >No</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="heart_disease" className='bg-clip-text text-transparent uppercase bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl select-none tracking-[1px]'>Heart Disease</label>
                                <div className='flex items-center'>
                                    <input type="radio" name='heart_disease' className='block m-4 cursor-pointer' value="1" onChange={changeHandler} /><span className='text-neutral-500  select-none  tracking-[0.5px]  ' >Yes</span>
                                </div>
                                <div className='flex items-center'>
                                    <input type="radio" name='heart_disease' className='block m-4 cursor-pointer' value="0" onChange={changeHandler} /><span className='text-neutral-500  select-none  tracking-[0.5px]  ' >No</span>
                                </div>
                            </div>

                        </div>



                        <div>
                            <label htmlFor="smoking_history" className='bg-clip-text select-none uppercase text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl tracking-[1px]'>Smoking History</label>
                            <div className='flex flex-col lg:flex-row space-y-2 md:space-y-0 md:space-x-8'>
                                <div className='flex items-center'>
                                    <input type="radio" name='smoking_history' className='block m-4 cursor-pointer' value="0" onChange={changeHandler} />
                                    <span className='text-neutral-500  select-none  tracking-[0.5px]'>No Info</span>
                                </div>
                                <div className='flex items-center'>
                                    <input type="radio" name='smoking_history' className='block m-4 cursor-pointer' value="1" onChange={changeHandler} />
                                    <span className='text-neutral-500  select-none  tracking-[0.5px]'>Current</span>
                                </div>
                                <div className='flex items-center'>
                                    <input type="radio" name='smoking_history' className='block m-4 cursor-pointer' onChange={changeHandler} value="2" />
                                    <span className='text-neutral-500 select-none tracking-[0.5px]'>Ever</span>
                                </div>
                            </div>


                            <div className='flex flex-col lg:flex-row space-y-2 md:space-y-0 md:space-x-8'>
                                <div className='flex items-center'>
                                    <input type="radio" name='smoking_history' className='block m-4 cursor-pointer' onChange={changeHandler} value="3" />
                                    <span className='text-neutral-500  select-none  tracking-[0.5px]  ' >Former</span>
                                </div>
                                <div className='flex items-center'>
                                    <input type="radio" name='smoking_history' className='block m-4 cursor-pointer' onChange={changeHandler} value="5" />
                                    <span className='text-neutral-500 select-none   tracking-[0.5px]  '>Not Current</span>
                                </div>
                                <div className='flex items-center'>
                                    <input type="radio" name='smoking_history' className='block m-4  cursor-pointer' onChange={changeHandler} value="4" />
                                    <span className='text-neutral-500  select-none  tracking-[0.5px]  '>Never</span>
                                </div>
                            </div>
                        </div>
                        <div className='h-[0.5px] w-[90%] bg-white  rounded-md ml-3 mb-6 mt-10' ></div>

                        <div>
                            <label htmlFor="bmi" className='bg-clip-text text-transparent select-none bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl tracking-[1px]'>BMI</label>
                            <input type="text" name='bmi' onChange={changeHandler} placeholder="BMI Value (Float)" className='block mt-3 mb-6  text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-1 pl-1 py-3 lg:placeholder:pl-4 lg:pl-4 placeholder:uppercase  placeholder:tracking-[1px] placeholder:text-xs lg:placeholder:text-sm' />
                        </div>

                        <div>
                            <label htmlFor="HbA1c_level" className='bg-clip-text text-transparent select-none bg-gradient-to-b from-neutral-200 to-neutral-600 uppercase text-xl lg:text-2xl tracking-[1px]'>HbA1c level</label>
                            <input type="text" name='HbA1c_level' onChange={changeHandler} placeholder="HbA1c Level (Float)" className=' block mt-3 mb-6 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-1 pl-1 lg:placeholder:pl-4 lg:pl-4 py-3 placeholder:uppercase  placeholder:tracking-[1px] placeholder:text-xs lg:placeholder:text-sm' />
                        </div>

                        <div>
                            <label htmlFor="blood_glucose_level" className='select-none bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 uppercase text-xl lg:text-2xl tracking-[1px]'>Blood Glucose Level</label>
                            <input type="text" name='blood_glucose_level' onChange={changeHandler} placeholder="Blood Glucose level (Int)" className=' block mt-3 mb-6 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-1 pl-1 lg:placeholder:pl-4 lg:pl-4 py-3 placeholder:uppercase  placeholder:tracking-[1px] placeholder:text-xs lg:placeholder:text-sm' />
                        </div>

                        <div className='text-center border border-white cursor-pointer rounded-[20px] py-5 mt-10 flex items-center justify-center space-x-6'>
                            {predictionResult ? (
                                <span className='select-none uppercase text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold tracking-[1px]'>
                                    {predictionResult}
                                </span>
                            ) : (
                                <>
                                    {loading ? (
                                        <div className="loader" />
                                    ) : (
                                        <button className='select-none uppercase text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold tracking-[1px]'>
                                            Predict
                                        </button>
                                    )}
                                    <BsFillSearchHeartFill size={30} className='fill-neutral-500' />
                                </>
                            )}
                        </div>


                    </form>
                </div>
            </div >
        </div >
    )
}

export default DiabetesPrediction