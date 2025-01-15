import * as React from "react";

export interface IGambarProps {
  url: string;
}

export default function GambarProps(props:IGambarProps) {
  return (
    <div
      className={
        props.url === ""
          ? " hidden"
          : "  relative lg:w-2/5 lg:p-0 px-2 pt-2 m-0 overflow-hidden text-gray-700 bg-white lg:rounded-r-none bg-clip-border rounded-xl shrink-0"
      }
    >
      {props.url && <img
        src={props.url}
        alt="card-image"
        className="object-cover w-full h-full rounded-xl "
      />}
    </div>
  )
}
