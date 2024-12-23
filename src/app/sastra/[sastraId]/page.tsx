'use client'
import * as React from "react";
import Header from "../../component/Header";
import Kaki from "../../component/Kaki";
import IsiArtikel from "../../component/IsiArtikel";
import { ArticleContext } from "../../context/ArticleContext";
import { useRouter,useParams } from 'next/navigation';


export default function Sastra() {
   const router = useRouter();
    const {sastraId} = useParams()
     const id = Array.isArray(sastraId)
       ? sastraId[0] // Extract the first element
       : sastraId;
  const articleContext = React.useContext(ArticleContext);
  if (!articleContext) {
    throw new Error("Article must be used within AuthProvider");
  }
  const { isiBlog } = articleContext;

  const targetArticle = isiBlog.find((x) => x.id === id);
  return (
    <div>
      <div className=" flex justify-center">
        <div className=" lg:w-11/12 mx-2 w-full">
          <Header type="pojokSastra" />
          <div className=" flex flex-row justify-between mx-20 mt-10">
            <button
              className=" text-2xl cursor-pointer"
              onClick={() => router.back()}
            >
              Kembali
            </button>
            <span className=" text-5xl">
              <b>Sastra</b>
            </span>
          </div>
          {targetArticle && id && (
            <IsiArtikel
              sastra={true}
              id={ id}
              isi={targetArticle}
            />
          )}
        </div>
      </div>
      <Kaki />
    </div>
  );
}
