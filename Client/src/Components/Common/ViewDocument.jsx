import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuAsterisk } from "react-icons/lu";
import { FaFilePdf, FaTrash } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ViewDocument = () => {
    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/user/viewFiles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDocuments(response?.data?.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [token]);

    const handleClick = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, documents.length - 1));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/user/search`, {
                searchQuery: searchTerm,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDocuments(response?.data?.files ?? []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (documentId) => {
        console.log("Edit document with ID:", documentId);
    };

    const handleDeleteConfirmation = (documentId) => {
        setDocumentToDelete(documentId);
    };

    const handleDelete = async () => {
        if (!documentToDelete) return;
        try {
            await axios.delete(`${BASE_URL}/api/v1/user/deleteFile/${documentToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDocuments((prevDocuments) => prevDocuments.filter(doc => doc._id !== documentToDelete));
            setDocumentToDelete(null);
            toast.success("Successfully deleted file.");
        } catch (error) {
            console.error("Error deleting document:", error);
            toast.error("Please Try Again", {
                autoClose: 2000,
            });
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token]);

    const SkeletonLoader = () => (
        <div className="animate-pulse">
            <div className="w-full h-[200px] bg-gray-300 rounded-[15px] mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>
    );

    return (
        <div className="min-h-screen min-w-screen dark:bg-black bg-white dark:bg-dot-white-[0.2] bg-dot-black-[0.2] relative flex items-center justify-center">
            <div className="rounded-md flex flex-col items-center justify-center antialiased">
                <div className="lg:-mt-18">
                    <div className="p-3 ipad:p-0">
                        <h1 className="text-4xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
                            View Report
                        </h1>
                        <p className="select-none text-neutral-500 max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl tracking-[1px] font-ai p-3 ipad:p-0 text-center">
                            Welcome to {" "}
                            <span className="uppercase font-bold floating-animation gemini-font">
                                Mediquity
                            </span>
                            , your secure and easy-to-use platform for managing your vital medical documents. We prioritize your privacy and convenience, ensuring a seamless experience every time.
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
                            <button type="submit" className="text-white mr-4 rounded-full border-2 flex justify-center p-2 mb-3 bg-gradient-to-b from-neutral-200 to-neutral-600 ">
                                <IoSearchOutline size={25} color="white" />
                            </button>
                        </div>
                    </form>
                    <div className="lg:p-0 p-3">
                        <div className="lg:w-[50vw]  min-h-[300px] border rounded-[30px] mt-[7%] border-neutral-300 mx-auto flex-col bg-black p-14 grid lg:grid-cols-3 gap-5 grid-cols-1 items-baseline">
                            {loading ? (
                                <>
                                    <SkeletonLoader />
                                    <SkeletonLoader />
                                    <SkeletonLoader />
                                </>
                            ) : !documents.length ? (
                                <div className="lg:w-[43vw]">
                                    <div className="mt-16 ipad:ml-10 ml-3 text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px]">No files found!</div>
                                </div>
                            ) : (
                                documents.slice(currentIndex, currentIndex + 3).map((document, index) => (
                                    <div key={index} className="w-full h-[300px] relative mb-4 overflow-hidden cursor-pointer">
                                        {document.fileUrl.toLowerCase().endsWith('.pdf') ? (
                                            <div className="w-full h-full relative flex flex-col justify-center">
                                                <FaFilePdf className="w-full h-[80%] object-cover rounded-[15px] p-2" color="red" size={50} onClick={() => handleClick(document.fileUrl)} />
                                                <div className="text-lg text-white uppercase tracking-[1.2px] truncate mx-auto mt-2 mb-4">
                                                    {document.filename.length > 15 ? document.filename.substring(0, 12) + "..." : document.filename}
                                                </div>
                                                <div className="flex justify-center items-baseline gap-x-2 mt-2">
                                                    <button
                                                        onClick={() => handleEdit(document.id)}
                                                        className="flex items-center gap-1 text-white px-3 py-2 bg-blue-600 rounded-md"
                                                    >
                                                        <FiEdit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteConfirmation(document._id)}
                                                        className="flex items-center gap-1 text-white px-3 py-2 bg-red-600 rounded-md"
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full relative flex flex-col justify-center">
                                                <img src={document.fileUrl} alt={document.filename} className="w-full h-[70%] object-cover border rounded-[15px]" onClick={() => handleClick(document.fileUrl)} />
                                                <div className="text-lg text-white uppercase tracking-[1.2px] truncate mx-auto mt-2 mb-4">
                                                    {document.filename.length > 15 ? document.filename.substring(0, 12) + "..." : document.filename}
                                                </div>
                                                <div className="flex justify-center items-baseline gap-x-2 mt-2">
                                                    <button
                                                        onClick={() => handleEdit(document.id)}
                                                        className="flex items-center gap-1 text-white px-3 py-2 bg-blue-600 rounded-md"
                                                    >
                                                        <FiEdit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteConfirmation(document._id)}
                                                        className="flex items-center gap-1 text-white px-3 py-2 bg-red-600 rounded-md"
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        {documents.length > 3 && (
                            <div className="flex justify-center mt-4">
                                <button onClick={handlePrev} disabled={currentIndex === 0} className="text-white mr-4 rounded-full border-2"><GrFormPrevious size={25} /></button>
                                <button onClick={handleNext} disabled={currentIndex + 3 >= documents.length} className="text-white rounded-full border-2"><GrFormNext size={25} /></button>
                            </div>
                        )}
                        <div className="flex ipad:justify-center mt-4 ipad:ml-6 gap-1">
                            <div className="text-red-500 text-md"><LuAsterisk /></div>
                            <div className="text-neutral-500 my-1 text-[0.65rem] text-center tracking-[1px]">Information provided is subject to ongoing evolution and may not be entirely accurate.</div>
                        </div>
                    </div>
                </div>
            </div>

            {
                documentToDelete && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-2">
                        <div className="bg-white rounded-lg shadow-lg max-w-md p-6 text-center">
                            <h2 className="text-xl font-bold mb-4">CONFIRM DELETE</h2>
                            <p className="text-md mb-6 uppercase tracking-wide">
                                Are you sure you want to delete the file?
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => handleDelete()}
                                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    YES
                                </button>
                                <button
                                    onClick={() => setDocumentToDelete(null)}
                                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    NO
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ViewDocument;
