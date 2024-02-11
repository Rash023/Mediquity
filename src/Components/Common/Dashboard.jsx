import { BackgroundBeams } from "../UI/BackgroundBeam.tsx";
import { PiHandWavingFill } from "react-icons/pi";
import { MdBloodtype } from "react-icons/md";
import { Tabs } from "../UI/Tabs.tsx";
import './Dashboard.css'
import AllDocs from "../Core/AllDocs.jsx";
export function Dashboard() {

    const tabs = [
        {
            title: "Profile",
            value: "Profile",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-r from-purple-900 via-sky-400 to-blue-700 ">
                    <p className="font-cursive text-6xl first-letter:text-7xl tracking-[1.5px] font-thin">Hello, Hindol <PiHandWavingFill size={50} color="white" className="inline-block animate-waving" /></p>
                    <MyProfile />
                </div>
            ),
        },
        {
            title: "My Docs",
            value: "My Docs",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-r from-slate-900 to-slate-700">
                    <p className="text-4xl sm:text-7xl font-cursive font-thin bg-clip-text text-transparent bg-gradient-to-b   from-neutral-200 to-neutral-500 py-8 tracking-[1.5px]">My Docs <span className="text-4xl sm:text-7xl font-cursive font-thin bg-clip-text text-transparent bg-gradient-to-b   from-neutral-200 to-neutral-500 py-8 tracking-[1.5px] animate-spotlight">...</span></p>
                    {/* <div className='bg-slate-300 h-[0.5px] w-[75rem] mt-[4%] '></div> */}
                    <AllDocs/>
                </div>
            ),
        },
        {
            title: "Playground",
            value: "playground",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-r from-sky-500 to-pink-500">
                    <p>Playground tab</p>
                    
                </div>
            ),
        },
        {
            title: "Content",
            value: "content",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Content tab</p>
                    {/* <DummyContent /> */}
                </div>
            ),
        },
        {
            title: "Random",
            value: "random",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Random tab</p>
                    {/* <DummyContent /> */}
                </div>
            ),
        },
    ];

    return (
        <div className="h-[150vh] dark:bg-black bg-white  -mt-[12%] -mb-[5%]">
            {/* <BackgroundBeams /> */}
            <div className="h-[30rem] md:h-[70rem] [perspective:1000px] relative b flex flex-col mx-auto w-full items-start justify-start my-1 max-w-7xl">
                <Tabs tabs={tabs} />
            </div>

        </div>

    );
}

const MyProfile = () => {
    const avatar = [
        'https://api.dicebear.com/7.x/open-peeps/svg?seed=Jasper',
        'https://api.dicebear.com/7.x/open-peeps/svg?seed=Missy',
        'https://api.dicebear.com/7.x/open-peeps/svg?seed=Charlie'
    ]
    const randomIndex = Math.floor(Math.random() * avatar.length);
    return (

        <div className="flex  p-10 justify-center font-ai  text-5xl card-contain ">
          
            <div className="  flex flex-col gap-y-9 mt-[2%]  nft">
            <hr />
                <div className="flex justify-evenly ">
                        <div>
                            <div className="flex gap-x-10 items-baseline">
                                <div>Name - </div>
                                <div>Hindol Roy</div>
                            </div>
                            <div className="flex gap-x-10 items-baseline">
                                <div>Phone - </div>
                                <div className="tracking-[2px]">
                                    {Array.from("+91 6290183645").map((char, index) => (
                                        <span
                                            key={index}
                                            className={`inline-block ${index % 2 === 0 ? "animate-move-up" : "animate-move-down"
                                                }`}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-x-10 items-baseline">
                                <div>Email - </div>
                                <div>hindol.roy@gmail.com</div>
                            </div>
                            <div className="flex gap-x-10 items-baseline">
                                <div>Blood Group - </div>
                                <div>O +</div>
                            </div>
                        </div>
                    
                    <div className="">
                        <img src={avatar[randomIndex]} alt="" width={350} height={350} />
                    </div>
                </div>
               
            </div>

            

        </div>


    );

};
