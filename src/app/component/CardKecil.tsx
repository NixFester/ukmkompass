import React, { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";

export interface ICardKecilProps {}

export default function CardKecil(props: ICardKecilProps) {
  const articleContext = useContext(ArticleContext);
  if (!articleContext) {
    throw new Error("Article must be used within AuthProvider");
  }
  const { isiBlog } = articleContext;

  return (
    <div>
      {/* component */}
      {/* component */}
      <div className=" ml-2 w-[530px]">
        {isiBlog &&
          isiBlog.slice(0, 3).map((artikel) => (
            <div key={artikel.id} className="relative flex flex-col mt-6 bg-white shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-lg transition-all cursor-pointer">
              <a
                className="p-4"
                href={`/${artikel.sastra ? "sastra" : "artikel"}/${artikel.id}`}
              >
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                  {artikel.title}
                </h5>
                <p className="text-slate-600 leading-normal font-light">
                  {artikel.body.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 200) +
                    "..."}
                </p>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
