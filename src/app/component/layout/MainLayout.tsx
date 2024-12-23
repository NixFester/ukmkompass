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
    <div>
      <div className=" flex justify-center">
        <div className=" w-11/12 mx-2">
          <Header type={tipe} />
          <img src={'/KomPaSSPancasaktiHD.png'} alt="tulisan" className=" w-full my-2"  width={0} height={0}/>
          <Line />
          <div className=" flex lg:flex-row flex-col">
            <ListArtikel Kategori={props.Kategori} searchQuery={props.query} />
            <div className=" lg:w-2/12 ml-10">
              <UserAvatar />
              <p className="  mt-2 text-slate-800 text-4xl font-semibold mb-3">
                Cari {props.Kategori === 1 || props.Kategori === 2 ? "Artikel" : props.Kategori === 3 ? "Sastra" : "Sesuatu"}
              </p>
              <Line kelas=" h-2 sm:w-[200px]" />
              <SearchBox />
              <p className="  mt-2 text-slate-800 text-4xl font-semibold mb-3">
                Terbaru
              </p>
              <Line kelas=" h-2 sm:w-[200px]" />
              <CardKecil />
            </div>
          </div>
        </div>
      </div>
      <Kaki></Kaki>
      <BotNav />
    </div>
  );
}
