'use client'
import React, { useEffect, useState } from "react";
import {
  getUserBasedOnArticle,
  getUserBasedOnSastraId,
} from "../api/userApi";
import Image from "next/image";

export interface IAvatarWriterProps {
  id: string;
  sastra: boolean;
}

interface writerProf {
  profpic: string;
  name: string;
  description: string;
}

export function AvatarWriter(props: IAvatarWriterProps) {
  const [user, setUser] = useState<writerProf | null>(null);
  useEffect(() => {
    if (props.id === "") {
      return;
    }
    if (props.sastra) {
      getUserBasedOnSastraId(props.id).then((data) => setUser(data));
    } else {
      getUserBasedOnArticle(props.id).then((data) => setUser(data));
    }
  }, [props.id,props.sastra]);
  return (
    <div
      className={
        " w-fit my-5 mx-auto bg-white p-8 mt-5 flex lg:flex-row flex-col justify-center shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-lg transition-all "
      }
    >
      <div className="lg:relative w-[96px] h-[96px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        {user && <Image src={`/api/proxy-image?imageUrl=${encodeURIComponent(user.profpic)}`}
                                        alt="gambar"
                                        className="absolute w-[96px] h-[96px] text-gray-400 "
                                        height={96}
                                        width={96} />}
      </div>
      <div className=" lg:max-w-96 mt-4 lg:mt-0 lg:ml-5">
        <p>
          Penulis:
        </p>
        <p className=" text-3xl">
          <b>{user?.name}</b>
        </p>
        <p className=" text-2xl">{user?.description}</p>
      </div>
    </div>
  );
}
