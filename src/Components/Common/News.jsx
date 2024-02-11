import React, { useState, useEffect } from "react";
import axios from 'axios';
import { LayoutGrid } from "../UI/LayoutGrid.tsx";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TextGenerateEffect } from "../UI/TextGenerateEffect.tsx";
import { TracingBeam } from "../UI/TracingBeam.tsx";

export function News() {
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const cardsPerPage = 4;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=5ba1d439297d4a7299e6a4e7648a218c&page=${page}&pageSize=${cardsPerPage}`);
                const articles = response?.data?.articles || [];
                const newsCards = articles.map((article, index) => ({
                    id: (page - 1) * cardsPerPage + index + 1,
                    content: <ArticleSkeleton key={index} title={article.title} description={article.description} />,
                    className: index % 2 === 0 ? "md:col-span-2" : "col-span-1",
                    thumbnail: article.urlToImage
                }));
                setCards(newsCards);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, [page]);

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="bg-black h-[120vh] flex flex-col">

            <div className="max-w-7xl mx-auto mt-[2%]">
                <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
                    <TextGenerateEffect words="Daily Feed" />
                </h1>
            </div>
            <TracingBeam>
                <div className="h-screen py-10 w-[1000px]">
                    <LayoutGrid cards={cards} />
                    <div className="flex justify-center mt-4">
                        <button onClick={handlePrevPage} disabled={page === 1} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-2 rounded-full">
                            <GrFormPrevious />
                        </button>
                        <button onClick={handleNextPage} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
                            <GrFormNext />
                        </button>
                    </div>
                </div>
            </TracingBeam>
        </div>

    );
}

const ArticleSkeleton = ({ title, description }) => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">{title}</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">{description}</p>
        </div>
    );
};
