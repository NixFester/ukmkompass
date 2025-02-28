'use client'
import React, { useContext, useEffect, useMemo,useState } from "react";
import Line from "./Line";
import { AvatarWriter } from "./AvatarWriter";
import CardKecil from "./CardKecil";
import { AuthContext } from "../context/AuthContext";
import Komentar from "./Komentar";
import KomentarAvatar from "./KomentarAvatar";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AiOutlineLike,AiFillLike} from "react-icons/ai";
import {reaksi, hapusReaksi, likeArtikel, unlikeArtikel, likeSastra,unlikeSastra , dislikeArtikel, undislikeArtikel, dislikeSastra, undislikeSastra} from '../api/userApi'
import { useRouter } from "next/navigation";

export interface IIsiArtikelProps {
  id: string;
  isi: IArticle | ISastra;
  sastra: boolean;
}

function isUnique(str: string, arr: string[]): boolean {
  return !arr.includes(str);
}


export default function IsiArtikel(props: IIsiArtikelProps) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Article must be used within AuthProvider");
  }
  const { profile,addProfileReactionState, removeProfileReactionState } = authContext;
  const targetArticle = props.isi;
  
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }),[]);
  if (!props.id) {
    return <div>invalid</div>
  }

  const [likeBlogState,setLikeState] = useState(targetArticle.like || 0)
  const [uniqueReactionState, setUniqueReaction] = useState(Boolean)

  useEffect(()=>{
    if(profile){
      setUniqueReaction(isUnique(targetArticle.id,profile.interaksi? profile.interaksi : []))
    }
  },[])

  return (
    <div className=" w-full lg:p-16 p-2 flex justify-center flex-col">
      <Line />
      {targetArticle.image && <Image src={targetArticle.image} alt="" className=" mt-10"  width={1200} height={1200} />}
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

        <div className="self-end flex mb-10 gap-2">
          <div className=" cursor-pointer" onClick={async ()=>{
            if (profile) {
              if (uniqueReactionState){
                if (await reaksi(profile.id,targetArticle.id)) {
                  props.sastra? likeSastra(targetArticle.id): likeArtikel(targetArticle.id)
                  setLikeState((prev)=> prev+1)
                  setUniqueReaction((prev)=>!prev)
                  addProfileReactionState(targetArticle.id)
                }
              } else {
                if ( await hapusReaksi(profile.id,targetArticle.id)) {
                  props.sastra? unlikeSastra(targetArticle.id): unlikeArtikel(targetArticle.id)
                  setLikeState((prev)=> prev-1)
                  setUniqueReaction((prev)=>!prev)
                  removeProfileReactionState(targetArticle.id)
                }
              }
            }
          }}>
            {uniqueReactionState?
            <AiOutlineLike size={62}/>: <AiFillLike size={62}/>
            }
          </div>
          <p className=" text-6xl">{likeBlogState}</p>
          
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
        {targetArticle && targetArticle.komentar.map((comment) => (
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
       
      </div>
    </div>
  );
}
