'use client'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Image from "next/image";


export function UserAvatar() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Profile must be used within AuthProvider");
  }
  const { profile } = authContext;
  return (
    <div>
      <div
        className={
          profile
            ? " w-fit mx-auto bg-white p-8 mt-10 lg:flex flex-row shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-lg transition-all cursor-pointer hidden"
            : "hidden"
        }
      >
        <div className="relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <Image src={`/api/proxy-image?imageUrl=${encodeURIComponent(profile?profile?.profpic:"")}`}
            alt="gambar"
            className="absolute w-32 h-32 text-gray-400 "
            height={96}
            width={96} />
        </div>
        <div className="ml-5 text-3xl flex justify-center flex-col">
          <p>Selamat Datang!</p>
          <p>{profile?.name}!</p>
        </div>
      </div>
    </div>
  );
}
