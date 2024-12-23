'use client'
import * as React from "react";

export interface IAppProps {}

export default class Judul extends React.Component<IAppProps> {
  public render() {
    return (
      <a href="/" className="flex items-center mb-2">
        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
          KomPaSS Pancasakti
        </span>
      </a>
    );
  }
}
