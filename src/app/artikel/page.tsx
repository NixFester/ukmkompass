'use client'
import * as React from "react";
import MainLayout from "../component/layout/MainLayout";


export default class ArtikelRoute extends React.Component {
  public render() {
    return (
      <div>
        <MainLayout Kategori={2} />
      </div>
    );
  }
}
