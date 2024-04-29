import React, { useEffect, useState } from "react"
import { GlobeDemo } from '../Common/ContactUs'
import CountryCode from "../../Data/countrycode.json"
import { useForm } from "react-hook-form"
import { apiConnector } from "../../Service/apiConnector"
import { contactusEndpoint } from "../../Service/apis"
import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import "./Contact.css"


export const Contact = () => {
  const [loading,setLoading]=useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setLoading(false)
      toast.success("Mail Send Successfully");
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }
 
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

 
  return (
    <div className='flex flex-col lg:flex-row lg:min-h-screen h-full lg:min-w-screen bg-black overflow-clip'>
      <div className='lg:w-[50%] w-[90%] flex flex-col lg:ml-16 mx-auto contact-glass '>
        <div className='lg:w-[55%] w-[90%] h-fit rounded-[30px] mt-16 mx-auto border p-6 '>
          <form onSubmit={handleSubmit(submitContactForm)}>

            <div className='grid lg:grid-cols-2 grid-cols-1 items-baseline gap-x-3  mt-8'>
              <div>
                <label htmlFor="firstname" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>First Name</label>
                <input type="text" placeholder='First Name' name='firstname' className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm'
                 {...register("firstname", { required: true })} />
              </div>
              <div >
                <label htmlFor="lastname" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>Last Name</label>
                <input type="text" placeholder='Last Name' name='lastname'  className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm'
                 {...register("lastname")} />
              </div>
            </div>

            <div className='mt-6'>
              <label htmlFor="email" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>Email</label>
              <input type="email" placeholder='Email' name='email'  className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm' 
               {...register("email", { required: true })}/>
            </div>

            <div className='mt-[4.5%] '>
              <label htmlFor="number" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>Phone Number</label>
              <div className='flex items-center gap-x-3'>
                <div className='w-[30%]'>
                  <div className="flex  flex-col gap-2">
                    <select
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Enter first name"
                      className="block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm appearance-none"
                      {...register("countrycode", { required: true })}
                    >
                      {CountryCode.map((ele, i) => {
                        return (
                          <option key={i} value={ele.code} className='text-black bg-transparent'>
                            {ele.code}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className='w-[70%]'>
                  <input type="number" placeholder='' name='phonenumber' 
                  id="phonenumber"
                  className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm'
                  {...register("phoneNo", {
                    required: {
                      value: true,
                      message: "Please enter your Phone Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Phone Number" },
                    minLength: { value: 10, message: "Invalid Phone Number" },
                  })}
                   />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-7">
              <label htmlFor="message" className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px]">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                cols="20"
                rows="4"
                placeholder="Enter your message here"
                className=" rounded-lg bg-zinc-800 placeholder:pl-4 pl-4 py-3 placeholder:tracking-[1px] placeholder:text-sm border border-gray-100 placeholder:pt-3 text-white placeholder:text-2xl placeholder:font-ai"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Message.
                </span>
              )}
            </div>

            <div className='text-center w-full lg:py-11 mt-6'>
              <button
               type="submit"
               disabled={loading}
                className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-[15px] h-[6vh] font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] uppercase tracking-[2px]
                ${
                  !loading && 
                  "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }disabled:bg-richblack-500 sm:text-[16px]`}
                
                
               
              >
                Submit &rarr;
                <BottomGradient />
              </button>
            </div>



          </form>
        </div>

      </div>
      <div className="border lg:w-[2px] lg:h-[600px] lg:mt-[10%] border-gray-500 w-[60%] mx-auto mt-[15%]"></div>

      <div className='lg:w-[50%] w-[100%]'>
        <GlobeDemo />
      </div>
    </div>




  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};