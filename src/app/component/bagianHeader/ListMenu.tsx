import * as React from "react";

interface IListMenuProps {
  teks: string;
  href: string;
  type: boolean;
}

const ListMenu: React.FunctionComponent<IListMenuProps> = (props) => {
  const addExtra = props.type
    ? "bg-white shadow-[0px_-11px_16px_1px_rgba(0,_0,_0,_0.1)] rounded-t-3xl"
    : " hover:bg-white hover:shadow-[0px_-11px_16px_1px_rgba(0,_0,_0,_0.1)] hover:rounded-t-3xl bg-transparent text-white hover:text-black";
  return (
    <li>
      <a
        href={props.href}
        className={"block py-3 px-5 mx-1  h-full  " + addExtra}
      >
        {props.teks}
      </a>
    </li>
  );
};

export default ListMenu;
