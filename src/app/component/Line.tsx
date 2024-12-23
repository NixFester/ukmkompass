'use client'
import * as React from "react";

export interface ILineProps {
  kelas?: string;
}

export default class Line extends React.Component<ILineProps> {
  public render() {
    return (
      <div
        className={` ${this.props.kelas ? this.props.kelas : " py-2.5"} border border-gray-200  sm:px-4 rounded shadow bg-rose-400 `}
      ></div>
    );
  }
}
