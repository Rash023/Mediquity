import React, { useState } from 'react'

const Login = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const submitHandler = async (e) => {
    // e.preventDefault();
    // console.log(formData);

    // try {
    //   const response = await fetch('http://127.0.0.1:5000/predict/diabetes', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   });
    //   const data = await response.json();
    //   console.log(data);
    //   setPredictionResult(data.result);
    // } catch (error) {
    //   console.error('Error:', error);
    // } finally {
    //   setLoading(false);
    // }
  };


  return (
    <div className="min-h-[100vh] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <h1 className="select-none text-4xl lg:text-7xl pt-[4%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[2.5%]">
        MEDIQUITY
      </h1>

      <p className="select-none text-neutral-500 max-w-[40rem] mx-auto text-lg lg:text-[1.55rem] text-center tracking-[1px] font-ai p-3 lg:p-0">
        Welcome back to  <span className="uppercase font-bold floating-animation gemini-font">
          Mediquity
        </span>. Now, allow us to take care of the rest for you. Your health is our priority.
      </p>


      <div className='flex justify-center mt-8 lg:mt-10 p-7'>
        <div className='w-[400px] h-fit border border-white rounded-[30px] bg-black p-10 '>
          <form onSubmit={submitHandler}>
            <div className=''>
              <label htmlFor="email" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>Email</label>
              <input type="text" placeholder='Enter  email' name='age' onChange={changeHandler} className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm' />
            </div>

            <div className='mt-[10%]'>
              <label htmlFor="password" className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl uppercase select-none tracking-[1px] '>Password</label>
              <input type="text" placeholder='Enter Password' name='age' onChange={changeHandler} className='block mt-3 mb-3 text-white w-[99%] bg-transparent border border-gray-100 rounded-lg placeholder:pl-4 pl-4 py-3 placeholder:uppercase placeholder:tracking-[1px] placeholder:text-sm' />
            </div>

            <div className='text-center w-full lg:py-11 mt-6'>
              <button
               className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-[15px] h-[6vh] font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] uppercase tracking-[2px]"
               type="submit"
              >
                Login &rarr;
                <BottomGradient />
              </button>
            </div>

            <div className='flex gap-x-2 justify-center lg:-mt-4 mt-2'>
              <div className='text-neutral-500 text-sm'>Don't have an account?</div>
              <a href='/SignUp' className='font-bold floating-animation gemini-font text-sm cursor-pointer hover:underline'>Register</a>
            </div>

          </form>
        </div>
      </div >
    </div >
  )
}

export default Login

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};