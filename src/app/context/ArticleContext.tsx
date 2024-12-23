'use client'
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface ArticleContext {
  articles: IArticle[];
  setArticlesState: React.Dispatch<React.SetStateAction<IArticle[]>>;
  sastra: ISastra[];
  setSastraState: React.Dispatch<React.SetStateAction<ISastra[]>>;
  isiBlog: IIsiBlog[];
  belumLulusSensor: IIsiBlog[];
}

interface IIsiBlog extends ISastra {
  lolosSensor?: boolean;
  sastra: boolean;
}

export const ArticleContext = createContext<ArticleContext | undefined>(
  undefined
);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticlesState] = useState<IArticle[]>([]);
  const [sastra, setSastraState] = useState<ISastra[]>([]);
  const [isiBlog, setIsiBlog] = useState<IIsiBlog[]>([]);
  const [belumLulusSensor, setBelumLulusSensor] = useState<IIsiBlog[]>([]);
  const BASE_URL = "/api";

  useEffect(() => {
    const fetchIsiBlog = async (): Promise<any> => {
      const { data }: { data: IArticle[] } = await axios.get(
        `${BASE_URL}/isiblog`
      );
      return data.sort((a, b) => Number(b.id) - Number(a.id));
    };
    fetchIsiBlog().then((data) => {
      console.log(data)
      const lulusSensor = data.filter(
        (item: ISastra | IArticle) => item.lolosSensor
      );
      const tidakLulusSensor = data.filter(
        (item: ISastra | IArticle) => !item.lolosSensor
      );
      setBelumLulusSensor(tidakLulusSensor);
      setIsiBlog(lulusSensor);
    });
  }, []);

  return (
    <ArticleContext.Provider
      value={{
        articles,
        setArticlesState,
        sastra,
        setSastraState,
        isiBlog,
        belumLulusSensor,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};