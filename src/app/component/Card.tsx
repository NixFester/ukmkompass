import * as React from "react";
import Gambar from "./bagianCard/Gambar";

export interface IAppProps {
  urlGambar: string | undefined;
  body: string;
  title: string;
  href: string;
  sastra: boolean;
}

export default class Card extends React.Component<IAppProps> {
  public render() {
    return (
      <div>
        {/* component */}
        <a href={this.props.href}>
          <div className="my-10 mx-auto hover:border-slate-300 hover:shadow-md  transition-all cursor-pointer">
            {/* Centering wrapper */}
            <div className="flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full lg:flex-row flex-col h-fit">
              <Gambar url={this.props.urlGambar ? this.props.urlGambar : ""} />
              <div className="p-6">
                <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                  {this.props.sastra ? "Sastra" : "Artikel"}
                </h6>
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {this.props.title}
                </h4>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  {this.props.body}
                </p>
                <div className="inline-block">
                  <button
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                  >
                    Lebih lanjut
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
