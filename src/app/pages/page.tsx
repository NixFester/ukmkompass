import * as React from "react";
import MainLayout from "../component/layout/MainLayout";


export default class Root extends React.Component {
  public render() {
    return (
      <div>
        <MainLayout Kategori={1} />
      </div>
    );
  }
}
