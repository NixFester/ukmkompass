import * as React from "react";
import Judul from "./bagianHeader/Judul";
import ListMenu from "./bagianHeader/ListMenu";
import { AuthContext } from "../context/AuthContext";

export interface IHeaderProps {
  type: "beranda" | "artikel" | "pojokSastra" | "akun" | "sesuatu";
}

export default function Header(props: IHeaderProps) {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("Profile must be used within AuthProvider");
  }
  const { profile } = authContext;
  return (
    <nav className=" bg-rose-500 border border-gray-200 px-2 pt-2 rounded shadow ">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Judul />
        <div className="w-full md:block md:w-auto hidden" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:mt-0 md:text-sm md:font-medium font-poppins">
            <ListMenu
              type={props.type === "beranda"}
              teks={"Beranda"}
              href="/"
            />
            <ListMenu
              type={props.type === "artikel"}
              teks={"Artikel"}
              href="/artikel"
            />
            <ListMenu
              type={props.type === "pojokSastra"}
              teks={"Pojok Sastra"}
              href="/sastra"
            />
            <ListMenu
              type={props.type === "akun"}
              teks={profile ? "Akun" : "Log In"}
              href={profile ? "/dashboard/akun" : "/auth"}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}
