import * as React from "react";
import { IoLogoWhatsapp, IoLogoYoutube } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";

export interface IAppProps {}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className="flex items-end w-full bg-white mt-5 ">
        <footer className="w-full text-gray-700 bg-gray-100 body-font">
          <div className="container flex flex-col flex-wrap py-10 mx-auto md:items-center md:flex-row md:flex-no-wrap justify-center">
            <div className=" lg:w-1/3 mx-auto text-center md:mx-0 md:text-left">
              <p className=" text-4xl ">KomPaSS</p>
              <p className="mt-2 text-gray-500 text-2xl">
                Komunitas Penulis dan Jurnalis Kampus
              </p>
              <p className="mt-2 text-gray-500">
                Jl. Halmahera No.KM. 01, Mintaragen, Kec. Tegal Tim., Kota
                Tegal, Jawa Tengah 52121
              </p>
              <p className="mt-2 text-gray-500 lg:mb-0 mb-4">Kontak:</p>
              <span className=" flex lg:flex-col flex-row mx-a justify-center gap-x-10 lg:mb-0 mb-4">
                <a href="https://wa.me/6287787757794" className="text-gray-500 cursor-pointer hover:text-gray-700 lg:flex my-2 ">
                  <IoLogoWhatsapp className=" w-6 h-6 mr-2" />
                  <p className="lg:block hidden">WhatsApp Ketua Umum : +6287787757794</p>
                </a>
                <a href="https://www.instagram.com/kompasspancasakti" className=" text-gray-500 cursor-pointer hover:text-gray-700 lg:flex my-2">
                  <FaInstagram className=" mr-2 w-6 h-6" />
                  <p className="lg:block hidden">@kompasspancasakti</p>
                </a>
                <a href="https://www.youtube.com/channel/UCU-wd_bcd66PPXjXcDW-Qdw" className=" text-gray-500 cursor-pointer hover:text-gray-700 lg:flex my-2">
                  <IoLogoYoutube className=" w-6 h-6 mr-2" />
                  <p className="lg:block hidden">Seputar KomPaSS Tegal</p>
                </a>
              </span>
            </div>
            <div className="lg:w-2/3 text-center my-0 md:mx-0 lg:text-justify lg:-mt-24 text-xl"></div>
          </div>
          <div className="bg-gray-300">
            <div className="container px-5 py-4 mx-auto">
              <p className="text-sm text-gray-700 capitalize xl:text-center">
                © 2024 All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
