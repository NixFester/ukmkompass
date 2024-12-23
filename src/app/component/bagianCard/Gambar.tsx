import * as React from "react";

export interface IGambarProps {
  url: string;
}

export default class Gambar extends React.Component<IGambarProps> {
  public render() {
    return (
      <div
        className={
          this.props.url === ""
            ? " hidden"
            : "relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0"
        }
      >
        {this.props.url && <img
          src={this.props.url}
          alt="card-image"
          className="object-cover w-full h-full"
        />}
      </div>
    );
  }
}
