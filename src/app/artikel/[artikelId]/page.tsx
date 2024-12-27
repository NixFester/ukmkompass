'use client'
import * as React from "react";
import Header from "../../component/Header";
import Kaki from "../../component/Kaki";
import { useRouter,useParams } from 'next/navigation';
import IsiArtikel from "../../component/IsiArtikel";
import { ArticleContext } from "../../context/ArticleContext";
import BlogPostLayout from "@/app/component/layout/BlogPostLayout";


export default function Artikel() {
  const router = useRouter();
  const {artikelId} = useParams()
  const id = Array.isArray(artikelId)
    ? artikelId[0] // Extract the first element
    : artikelId;
  const articleContext = React.useContext(ArticleContext);
  if (!articleContext) {
    throw new Error("Article must be used within AuthProvider");
  }
  const { isiBlog } = articleContext;

  const targetArticle = isiBlog.find((x) => x.id === artikelId);
  
  return (
    <BlogPostLayout targetArticle={targetArticle} id={id} jenis="Artikel"/>
  );
}
