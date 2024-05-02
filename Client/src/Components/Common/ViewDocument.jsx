import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuAsterisk } from "react-icons/lu";
import { FaFilePdf } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ViewDocument = () => {
    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const token = sessionStorage.getItem("token");
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get("https://mediquity-gtoc.onrender.com/api/v1/user/viewFiles", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDocuments(response?.data?.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchDocuments();
    }, [token]);

    const handleClick = (fileUrl) => {
        window.location.href = fileUrl;
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, documents.length - 1));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:4000/api/v1/user/search", {
                searchQuery: searchTerm,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDocuments(response?.data?.files);
        } catch (error) {
            console.error("Error searching documents:", error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);
    return (
        <div className="min-h-screen min-w-screen dark:bg-black bg-white dark:bg-dot-white-[0.2] bg-dot-black-[0.2] relative flex items-center justify-center">
            <div className="rounded-md flex flex-col items-center justify-center antialiased">
                <div className="lg:-mt-18">
                    <div className="p-3 lg:p-0 ">
                        <h1 className="text-4xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
                            View Report
                        </h1>
                        <p className="select-none text-neutral-500 max-w-lg mx-auto text-lg lg:text-[1.25rem] tracking-[1px] font-ai p-3 lg:p-0 text-justify">
                            Welcome to Mediquity, your secure and easy-to-use platform for managing your vital medical documents. We prioritize your privacy and convenience, ensuring a seamless experience every time.
                        </p>
                    </div>
                    <form onSubmit={handleSearch}>
                        <div className="p-4 lg:p-0 mt-[5%] flex items-center gap-3 lg:w-[50vw] w-[90vw] mx-auto">
                            <input
                                type="text"
                                placeholder="Search document"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="lg:w-[50vw] w-[90vw] min-h-[70px] bg-transparent focus:outline-none border border-white py-2 px-4 mb-4 shadow-lg placeholder:uppercase placeholder:tracking-[2px] lg:placeholder:text-md placeholder:text-sm rounded-[30px] text-white"
                            />
                            <button type="submit" className="text-white mr-4 rounded-full border-2 flex justify-center p-2 mb-3  bg-gradient-to-b from-neutral-200 to-neutral-600 ">
                                <IoSearchOutline size={25} color="white" />
                            </button>
                        </div>
                    </form>
                    <div className="lg:p-0 p-3">
                        <div className="lg:w-[50vw]  min-h-[300px] border rounded-[30px] mt-[7%] border-neutral-300 mx-auto flex-col bg-black p-14 grid lg:grid-cols-3 gap-5 grid-cols-1 items-baseline">
                            {
                                !documents.length ? (
                                    <div className="lg:w-[43vw]">
                                        <div className="  mt-16 lg:ml-10 ml-3 text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px]">No files found!</div>
                                    </div>
                                ) : (
                                    documents.slice(currentIndex, currentIndex + 3).map((document, index) => (
                                        <div key={index} className="w-full h-[200px] relative mb-4 overflow-hidden cursor-pointer" onClick={() => handleClick(document.fileUrl)}>
                                            {document.fileUrl.toLowerCase().endsWith('.pdf') ? (
                                                <div className="w-full h-full relative flex flex-col justify-center">
                                                    <FaFilePdf className="w-full h-[90%] object-cover rounded-[15px] p-2" color="red" size={50} />

                                                    <div className="text-lg text-white uppercase tracking-[1.2px] truncate mx-auto mt-[2%]">{document.filename.length > 15 ? document.filename.substring(0, 12) + "..." : document.filename}</div>

                                                </div>
                                            ) : (
                                                <div className="w-full h-full relative flex flex-col justify-center">
                                                    <img src={document.fileUrl} alt={document.filename} className="w-full h-[85%] object-cover border rounded-[15px]" />

                                                    <div className="text-lg text-white uppercase tracking-[1.2px] truncate mx-auto mt-[2%]">{document.filename.length > 15 ? document.filename.substring(0, 12) + "..." : document.filename}</div>

                                                </div>
                                            )}
                                        </div>
                                    ))
                                )
                            }
                        </div>
                        {documents.length > 3 && (
                            <div className="flex justify-center mt-4">
                                <button onClick={handlePrev} disabled={currentIndex === 0} className="text-white mr-4 rounded-full border-2"><GrFormPrevious size={25} /></button>
                                <button onClick={handleNext} disabled={currentIndex + 3 >= documents.length} className="text-white rounded-full border-2"><GrFormNext size={25} /></button>
                            </div>
                        )}
                        <div className="flex lg:justify-center mt-4 lg:ml-6 gap-1">
                            <div className="text-red-500 text-md"><LuAsterisk /></div>
                            <div className="text-neutral-500 my-1 text-[0.65rem] text-center tracking-[1px]">Information provided is subject to ongoing evolution and may not be entirely accurate.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDocument;
