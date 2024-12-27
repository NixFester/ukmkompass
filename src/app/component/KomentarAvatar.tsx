import React from "react";

export interface IUserAvatarProps {
  name: string;
  profpic: string;
  isiKomentar: string;
  timestamp: Date;
}

export default function UserAvatar(props: IUserAvatarProps) {
  return (
    <div>
      <div
        className={
          props
            ? " w-full my-5 mx-auto bg-white p-8 mt-10 flex lg:flex-row flex-col gap-4 shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-lg transition-all cursor-pointer"
            : "hidden"
        }
      >
        <div className="relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <img
            src={props.profpic}
            alt="gambar"
            className="absolute w-32 h-32 text-gray-400 "
          />
        </div>
        <div className="ml-5 flex lg:flex-row flex-col gap-5">
          <div className=" lg:w-3/6">
            <p className=" text-2xl">{props.name}</p>
            <p>{props.timestamp.toLocaleDateString("id")}</p>
          </div>
          <div className=" lg:w-3/6 lg:ml-6 text-2xl [&>*]:mb-1">
            <p>Berkomentar:</p>
            <p>{props.isiKomentar}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
