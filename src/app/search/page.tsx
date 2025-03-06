'use client'
import React, { Suspense } from "react";
import MainLayout from "../component/layout/MainLayout";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";

function SearchResultContent() {
  const [articles,setArticles] = useState<IIsiBlog[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const paramValue = searchParams.get('q');
  useEffect(() => {
    const fetchIsiBlog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/isiblog`);
        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data: IIsiBlog[] = await res.json();
        setArticles(data.sort((a, b) => Number(b.id) - Number(a.id)));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchIsiBlog();
  }, []);

  return (
    <div>
      <MainLayout Kategori={4} isiBlog={articles} query={paramValue || ""} />
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