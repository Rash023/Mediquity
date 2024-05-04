import React from "react"

import Cover from "../../Asset/About/Cover.jpg"
import Image1 from "../../Asset/About/Image1.jpg"
import Image2 from "../../Asset/About/Image2.png"
import Image3 from "../../Asset/About/Image3.jpg"
import Quote from "./Quote"
import HighlightText from "./HighlightText"
import StatsComponent from "./Stats"



const About = () => {
    return (
        <div className="bg-black bg-dot-white/[0.2] text-white">
            <section className="w-11/12 mx-auto">
                <div className="relative mx-auto flex w-full max-w-maxContent flex-col justify-between gap-10 text-center">
                    <header className="mx-auto py-20 lg:text-[40px] text-[30px] font-semibold w-full font-sans tracking-widest leading-[1.2]">
                        DRIVING AI INNOVATION IN HEALTHCARE FOR
                        <HighlightText text={"BRIGHTER FUTURE"} />
                        <p className="mx-auto text-center font-extralight text-neutral-500 lg:w-[95%] font-ai lg:mt-[2%] mt-[6%] text-[20px]">
                            Mediquity is leading the charge in transforming healthcare through AI. We're dedicated to enhancing medical services and advancing patient care by offering state-of-the-art AI-powered solutions, harnessing cutting-edge technologies, and fostering a collaborative medical community.
                        </p>
                    </header>
                    <div className="sm:h-[70px] lg:h-[150px] "></div>
                    <div className="absolute bottom-0 left-[50%] grid lg:w-[80%] w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-2 lg:gap-10">
                        <img src={Image1} alt="" className="h-full w-full" />
                        <img src={Image2} alt="" className="h-full w-full" />
                        <img src={Image3} alt="" className="h-full w-full" />
                    </div>
                </div>
            </section>

            <section className="border-b border-richblack-700 lg:mt-0 -mt-10 w-10/12 mx-auto">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="h-[100px] "></div>
                    <Quote />
                </div>
            </section>

            <section className="w-11/12  mx-auto">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                        <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  font-sans bg-clip-text font-bold text-4xl lg:w-[90%] uppercase tracking-wider lg:text-lefttext-center">
                                Our Founding Story
                            </h1>
                            <p className="font-light text-neutral-500 lg:w-[95%] w-[100%] lg:text-2xl text-xl font-ai tracking-wider">
                                Our AI-driven health platform emerged from a collective vision and drive to revolutionize healthcare. It started with a team of healthcare professionals, technologists, and enthusiasts who identified the demand for accessible, adaptable, and top-tier health solutions in an ever-changing digital landscape.
                            </p>
                            <p className="lg:text-2xl text-xl font-light text-neutral-500 lg:w-[95%] w-[100%] font-ai tracking-wider">
                                As seasoned healthcare professionals, we've witnessed the limitations of traditional healthcare systems. We firmly believe that access to quality healthcare should not be restricted by location or conventional methods. Our goal is to develop an AI-generated health platform that transcends these boundaries, empowering individuals from all walks of life to optimize their well-being.
                            </p>
                        </div>

                        <div>
                            <img
                                src={Cover}
                                height={500}
                                width={500}
                                alt=""
                                className="shadow-[0_0_20px_0] shadow-[#FC6767] "
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  font-sans bg-clip-text font-bold text-4xl lg:w-[70%] uppercase tracking-wider lg:text-left text-center">
                                Our Vision
                            </h1>
                            <p className="lg:text-2xl text-xl font-light text-neutral-500 lg:w-[95%] w-[100%] font-ai tracking-wider">
                                With this vision in mind, we set out on a journey to create an
                                e-learning platform that would revolutionize the way people
                                learn. Our team of dedicated experts worked tirelessly to
                                develop a robust and intuitive platform that combines
                                cutting-edge technology with engaging content, fostering a
                                dynamic and interactive learning experience.
                            </p>
                        </div>
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  font-sans bg-clip-text font-bold text-4xl lg:w-[80%] uppercase tracking-wider lg:text-left text-center">
                                Our Mission
                            </h1>
                            <p className="lg:text-2xl text-xl font-medium text-neutral-500 lg:w-[95%] w-[100%] font-ai tracking-wider">
                                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <StatsComponent />
        </div>
    )
}

export default About
