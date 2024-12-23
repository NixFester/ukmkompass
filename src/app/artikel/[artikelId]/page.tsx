'use client'
import * as React from "react";
import Header from "../../component/Header";
import Kaki from "../../component/Kaki";
import { useRouter,useParams } from 'next/navigation';
import IsiArtikel from "../../component/IsiArtikel";
import { ArticleContext } from "../../context/ArticleContext";


export default function Artikel() {
  const router = useRouter();
  const {artikelId} = useParams()
  const id = Array.isArray(artikelId)
    ? artikelId[0] // Extract the first element
    : artikelId;
  const articleContext = React.useContext(ArticleContext);
  if (!articleContext) {
    throw new Error("Article must be used within AuthProvider");
  }
  const { isiBlog } = articleContext;

  const targetArticle = isiBlog.find((x) => x.id === artikelId);
  
  return (
    <div>
      <div className=" flex justify-center">
        <div className=" lg:w-11/12 mx-2 w-full">
          <Header type="artikel" />
          <div className=" flex flex-row justify-between mx-20 mt-10">
            <button
              className=" text-2xl cursor-pointer"
              onClick={() => router.back()}
            >
              Kembali
            </button>
            <span className=" text-5xl">
              <b>Artikel</b>
            </span>
          </div>
          {targetArticle && (
            <IsiArtikel
              sastra={false}
              id={id || ""}
              isi={targetArticle}
            />
          )}
        </div>
      </div>
      <Kaki />
    </div>
  );
}
