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
  
  
  const [likeBlogState,setLikeState] = useState(targetArticle.like || 0)
  const [uniqueReactionState, setUniqueReaction] = useState(Boolean)

  useEffect(()=>{
    if(profile){
      setUniqueReaction(isUnique(targetArticle.id,profile.interaksi? profile.interaksi : []))
    }
  },[profile, targetArticle.id])

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }),[]);
  if (!props.id) {
    return <div>invalid</div>
  }
  const handleReaction = async () => {
    if (profile) {
      if (uniqueReactionState) {
        if (await reaksi(profile.id, targetArticle.id)) {
          if (props.sastra) {
            await likeSastra(targetArticle.id); // ✅ Explicit function call
          } else {
            await likeArtikel(targetArticle.id);
          }
          setLikeState((prev) => prev + 1);
          setUniqueReaction(false);
          addProfileReactionState(targetArticle.id);
        }
      } else {
        if (await hapusReaksi(profile.id, targetArticle.id)) {
          if (props.sastra) {
            await unlikeSastra(targetArticle.id); // ✅ Explicit function call
          } else {
            await unlikeArtikel(targetArticle.id);
          }
          setLikeState((prev) => prev - 1);
          setUniqueReaction(true);
          removeProfileReactionState(targetArticle.id);
        }
      }
    }
  }


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

        {profile?<div className="self-start mb-10 -mt-10 ml-3 border-4 border-red-400 rounded-lg ">
          <div className=" flex gap-2 cursor-pointer" onClick={handleReaction
          }>
            {uniqueReactionState?
            <AiOutlineLike className=" text-3xl lg:text-6xl" />: <AiFillLike className=" text-3xl lg:text-6xl" />
            }
            <p className="  text-3xl md:text-6xl">{likeBlogState}</p>
          </div>
        </div>:
         <div className="self-start mb-10 -mt-10 ml-3 border-4 border-red-400 rounded-lg ">
         <div className=" flex gap-2" >
           <AiFillLike className=" text-3xl lg:text-6xl" />
           <p className="  text-3xl md:text-6xl">{likeBlogState}</p>
         </div>
       </div>
        }

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
