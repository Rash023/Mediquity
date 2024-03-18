import React from 'react'
import { GlobeDemo } from '../Common/ContactUs'
import { motion } from "framer-motion";
import CountryCode from "../../data/countrycode.json"
import { useForm } from "react-hook-form"
export const Contact = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitHandler = () => {
    console.log("hu");
  }

  const changeHandler = () => {
    console.log("hu");
  }
  return (
    <div className='flex flex-col lg:flex-row lg:min-h-screen h-full lg:min-w-screen bg-black'>
      <div className='lg:w-[50%] w-[90%] flex flex-col ml-16'>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div mt-[5%]"
        >
          <h2 className="text-4xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px]">
            Contact Us
          </h2>
          {/* <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
            This globe is interactive and customizable. Have fun with it, and
            don&apos;t forget to share it. :)
          </p> */}
        </motion.div>
        <div className='w-full h-fit rounded-[30px] bg-black p-10 mt-8 mx-auto'>
          <form onSubmit={submitHandler}>
            <div className='flex flex-col gap-y-4'>
              <div className='text-4xl text-white font-bold font-ai'>
                Got a Idea? We've got the skills. Let's team up
              </div>
              <div className='text-2xl text-neutral-500 font-ai'>
                Tell us more about yourself and what you're got in mind.
              </div>
            </div>

            <div className='grid lg:grid-cols-2 grid-cols-1 items-baseline gap-x-3  mt-8'>
              <div>
                <label htmlFor="firstname" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>First Name</label>
                <input type="text" placeholder='First Name' name='firstname' onChange={changeHandler} className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm' />
              </div>
              <div >
                <label htmlFor="lastname" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>Last Name</label>
                <input type="text" placeholder='Last Name' name='lastname' onChange={changeHandler} className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm' />
              </div>
            </div>

            <div className='mt-6'>
              <label htmlFor="email" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>Email</label>
              <input type="email" placeholder='Email' name='email' onChange={changeHandler} className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm' />
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
                      className="block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm"
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
                  <input type="text" placeholder='123456789' name='age' onChange={changeHandler} className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm' />
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
                cols="30"
                rows="7"
                placeholder="Enter your message here"
                className=" rounded-lg bg-zinc-800 placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm border border-gray-100 placeholder:pt-3"
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
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-[15px] h-[6vh] font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] uppercase tracking-[2px]"
                type="submit"
              >
                Submit &rarr;
                <BottomGradient />
              </button>
            </div>



          </form>
        </div>

      </div>

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