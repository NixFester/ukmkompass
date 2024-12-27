'use client'
import * as React from "react";
import { ArticleContext } from "../../context/ArticleContext";
import { useParams } from 'next/navigation';
import BlogPostLayout from "@/app/component/layout/BlogPostLayout";


export default function Sastra() {
    const {sastraId} = useParams()
     const id = Array.isArray(sastraId)
       ? sastraId[0] // Extract the first element
       : sastraId;
  const articleContext = React.useContext(ArticleContext);
  if (!articleContext) {
    throw new Error("Article must be used within AuthProvider");
  }
  const { isiBlog } = articleContext;

  const targetArticle = isiBlog.find((x) => x.id === id);
  return (
    <BlogPostLayout targetArticle={targetArticle} id={id} jenis="Sastra"/>
  );
}
