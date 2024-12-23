'use client'
import * as React from "react";
import Link from "next/link";


export default class Judul extends React.Component {
  public render() {
    return (
      <Link href="/" className="flex items-center mb-2">
        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
          KomPaSS Pancasakti
        </span>
      </Link>
    );
  }
}
