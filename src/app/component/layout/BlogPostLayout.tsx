import React from "react";
import Header from "../Header";
import Kaki from "../Kaki";
import IsiArtikel from "../IsiArtikel";
import BotNav from "../BotNav";
import BackButton from "../BackButton";
interface BlogPostLayoutProps {
    targetArticle: IIsiBlog | undefined;
    id: string | undefined;
    jenis:string
}


export default function BlogPostLayout({ targetArticle, id,jenis }: BlogPostLayoutProps) {
    return (
    <div>
            <div className=" flex justify-center">
            <div className=" lg:w-11/12 lg:mx-2 w-full">
                <Header type="pojokSastra" />
                <div className=" flex flex-row lg:justify-between justify-center mx-4 lg:mx-20 mt-10">
                <BackButton className=" lg:text-2xl lg:block hidden lg:cursor-pointer">{"<"} Kembali</BackButton>
                <span className=" lg:text-8xl text-5xl ">
                    <b>{jenis}</b>
                </span>
                </div>
                {targetArticle && id && (
                <IsiArtikel
                    sastra={jenis === "Sastra"}
                    id={ id}
                    isi={targetArticle}
                />
                )}
            </div>
            </div>
            <Kaki />
            <BotNav />
        </div>
    );
}