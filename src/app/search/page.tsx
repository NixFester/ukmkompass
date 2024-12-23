'use client'
import React from "react";
import MainLayout from "../component/layout/MainLayout";
import { useSearchParams } from "next/navigation";


export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get('q');
  
  return (
    <div>
      <MainLayout Kategori={4} query={paramValue || ""} />
    </div>
  );
}
