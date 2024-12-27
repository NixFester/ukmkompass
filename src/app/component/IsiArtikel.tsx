'use client'
import React, { useContext, useMemo } from "react";
import Line from "./Line";
import { AvatarWriter } from "./AvatarWriter";
import CardKecil from "./CardKecil";
import { AuthContext } from "../context/AuthContext";
import Komentar from "./Komentar";
import KomentarAvatar from "./KomentarAvatar";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

export interface IIsiArtikelProps {
  id: string;
  isi: IArticle | ISastra;
  sastra: boolean;
}

export default function IsiArtikel(props: IIsiArtikelProps) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Article must be used within AuthProvider");
  }
  const { profile } = authContext;
  const targetArticle = props.isi;
  
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }),[]);
  if (!props.id) {
    return <div>invalid</div>
  }


  return (
    <div className=" w-full lg:p-16 p-2 flex justify-center flex-col">
      <Line />
      {<img src={targetArticle?.image} alt="" className=" mt-10" />}
      <h1 className=" lg:text-8xl text-5xl font-bold my-8">
        {targetArticle?.title}
      </h1>
      <Line />
      <div className=" flex flex-col lg:px-4 mt-10 ">
        <div className=" ">
          <ReactQuill
            readOnly={true}
            value={targetArticle.body}
            theme="bubble"
          />
        </div>

        <div className=" self-start">
          <AvatarWriter
            sastra={props.sastra}
            id={targetArticle ? targetArticle.id : ""}
          />
        </div>

        {profile && <Komentar
          sastra={props.sastra}
          idPengguna={profile ? profile.id : ""}
          idArtikel={targetArticle ? targetArticle.id : ""}
          profpic={profile ? profile.profpic : ""}
          name={profile ? profile.name : ""}
        />}
        {targetArticle?.komentar.map((comment) => (
          <KomentarAvatar
            key={comment.idKomentar}
            name={comment.userName}
            profpic={comment.profpic}
            isiKomentar={comment.isiKomentar}
            timestamp={new Date(comment.timestamp)}
          />
        ))}
      </div>
      <div className=" ml-10">
        <div>
          <p className="  mt-2 text-slate-800 text-4xl font-semibold mb-3 w-2/4">
            Terbaru
          </p>
          <Line kelas=" h-2 sm:w-[200px]" />
          <CardKecil />
        </div>
      </div>
    </div>
  );
}
