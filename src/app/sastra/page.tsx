'use client'
import * as React from "react";
import MainLayout from "../component/layout/MainLayout";

export interface IAppProps {}

export default class SastraRoute extends React.Component<IAppProps> {
  public render() {
    return (
      <div>
        <MainLayout Kategori={3} />
      </div>
    );
  }
}
