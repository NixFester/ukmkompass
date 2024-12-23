'use client'
import React, { Suspense } from "react";
import MainLayout from "../component/layout/MainLayout";
import { useSearchParams } from "next/navigation";

function SearchResultContent() {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get('q');

  return (
    <div>
      <MainLayout Kategori={4} query={paramValue || ""} />
    </div>
  );
}

export default function SearchResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultContent />
    </Suspense>
  );
}