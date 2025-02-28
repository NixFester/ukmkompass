import Header from "../Header";
import Line from "../Line";
import CardKecil from "../CardKecil";
import Kaki from "../Kaki";
import BotNav from "../BotNav";
import { UserAvatar } from "../UserAvatat";
import ListArtikel from "../ListArtikel";
import SearchBox from "../SearchComponent";
import Image from "next/image";

export interface IMainLayoutProps {
  Kategori: 1 | 2 | 3 | 4;
  query?: string;
  isiBlog?: IIsiBlog[]
}

export default function MainLayout(props: IMainLayoutProps) {
  
  const tipe =
    props.Kategori === 1
      ? "beranda"
      : props.Kategori === 2
        ? "artikel"
        : props.Kategori === 3
          ? "pojokSastra"
          : "sesuatu";
  return (
    <div className="">
      <div className=" flex justify-center">
        <div className=" w-11/12 mx-2">
          <Header type={tipe} />
          <Image className=" w-full my-2" src={props.Kategori===1?'/Kompass Pancasakti.png':props.Kategori===2?'/Artikel Kompass.png':props.Kategori===3?'/Pojok Sastra.png':'/Kompass Pancasakti.pn'} alt="tulisan" width={6080} height={864} />
          <Line />
          <div className=" flex lg:flex-row flex-col">
            <div className=" block lg:hidden">
              <p className="  mt-2 text-slate-800 text-4xl font-semibold mb-3">
                Cari {props.Kategori === 1 || props.Kategori === 2 ? "Artikel" : props.Kategori === 3 ? "Sastra" : "Sesuatu"}
              </p>
              <Line kelas=" h-2 sm:w-[200px]" />
              <SearchBox />
            </div>
            <ListArtikel Kategori={props.Kategori} searchQuery={props.query} 
            isiBlog={props.isiBlog && props.isiBlog.filter(
              (item: ISastra | IArticle) => item.lolosSensor
            ) } />
            <div className=" lg:w-[29%] lg:ml-10">
              <UserAvatar />
              
              <div className="hidden lg:block">
                <p className="  mt-2 text-slate-800 text-4xl font-semibold mb-3">
                  Cari {props.Kategori === 1 || props.Kategori === 2 ? "Artikel" : props.Kategori === 3 ? "Sastra" : "Sesuatu"}
                </p>
                <Line kelas=" h-2 sm:w-[200px]" />
                <SearchBox />
              </div>
              <p className="  mt-2 text-slate-800 text-4xl font-semibold mb-3">
                Terbaru
              </p>
              <Line kelas=" h-2 sm:w-[200px]" />
              
            </div>
          </div>
        </div>
      </div>
      <Kaki></Kaki>
      <BotNav />
    </div>
  );
}
