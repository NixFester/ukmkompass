import Judul from "./bagianHeader/Judul";
import ListMenu from "./bagianHeader/ListMenu";
import HeaderChoice from "./HeaderChoices";

export interface IHeaderProps {
  type: "beranda" | "artikel" | "pojokSastra" | "akun" | "sesuatu";
}

export default function Header(props: IHeaderProps) {

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
            <HeaderChoice />
          </ul>
        </div>
      </div>
    </nav>
  );
}
