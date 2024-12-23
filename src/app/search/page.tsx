'use client'
import React from "react";
import MainLayout from "../component/layout/MainLayout";
import { useRouter } from "next/navigation";

export interface ISearchProps {}

export default function SearchResultPage(props: ISearchProps) {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const paramValue = searchParams.get('q');
  return (
    <div>
      <MainLayout Kategori={4} query={paramValue || ""} />
    </div>
  );
}
