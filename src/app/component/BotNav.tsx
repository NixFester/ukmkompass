import * as React from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { GrArticle, GrHome  } from "react-icons/gr";
import { MdMenuBook,MdLogin } from "react-icons/md";
import { ImPen } from "react-icons/im";

export default function BotNav() {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("Profile must be used within AuthProvider");
  }
  const { profile } = authContext;
  return (
    <div>
      <div id="tabs" className="lg:hidden xl:hidden fixed bottom-0 left-0 right-0 flex justify-between bg-white">
        <Link
          href="/"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <GrHome size={30} className=" inline-block mb-1" />
          <span className="tab tab-home block text-s">Beranda</span>
        </Link>
        <Link
          href="/artikel"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <GrArticle size={30} className=" inline-block mb-1" />
          <span className="tab tab-kategori block text-s">Artikel</span>
        </Link>
        <Link
          href="/sastra"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <MdMenuBook size={30} className=" inline-block mb-1" />
          <span className="tab tab-explore block text-s">Sastra</span>
        </Link>
        <Link
          href={profile ? "/dashboard/akun" : "/auth"}
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          {profile ? (<ImPen size={30} className=" inline-block mb-1" />) : (<MdLogin size={30} className=" inline-block mb-1" />)}
          <span className="tab tab-account block text-s">{profile ? "Akun" : "Log In"}</span>
        </Link>
      </div>
    </div>
  );
}

