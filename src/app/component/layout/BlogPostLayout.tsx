import React from "react";
import Header from "../Header";
import Kaki from "../Kaki";
import IsiArtikel from "../IsiArtikel";
import BotNav from "../BotNav";
import BackButton from "../BackButton";
interface BlogPostLayoutProps {
    targetArticle: IIsiBlog[];
    id: string | undefined;
    jenis:string
}


export default function BlogPostLayout({ targetArticle, id,jenis }: BlogPostLayoutProps) {
    const targetnya = targetArticle.find(obj=>obj.id === id)
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
                {targetnya && id && (
                <IsiArtikel
                    sastra={jenis === "Sastra"}
                    id={ id}
                    isi={targetnya}
                />
                )}
            </div>
            </div>
            <Kaki />
            <BotNav />
        </div>
    );
}