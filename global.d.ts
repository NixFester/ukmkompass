/// <reference types="vite/client" />
interface KATEGORIENUM {
    SEMUA: 1;
    ARTIKEL: 2;
    SASTRA: 3;
  }
  
  interface komentarTemplate {
    idKomentar: string;
    userId: string;
    userName: string;
    profpic: string;
    isiKomentar: string;
    like: number;
    dislike: number;
    timestamp: Date;
    type?: boolean;
  }
  
  interface balasan1 extends komentarTemplate {
    balasan?: balasan2[];
  }
  
  interface balasan2 extends komentarTemplate {
    balasan?: [];
  }
  
  interface IKomentar extends komentarTemplate {
    balasan: balasan1[];
  }
  
  interface IArticle {
    id: string;
    image: string;
    title: string;
    body: string;
    komentar: komentarTemplate[] | [];
    like?: number;
    dislike?: number;
    lolosSensor?: boolean;
  }
  
  interface ISastra {
    id: string;
    image?: string;
    title: string;
    body: string;
    komentar: komentarTemplate[] | [];
    like?: number;
    dislike?: number;
    lolosSensor?: boolean;
  }

  
  interface UserProfile {
    id: string;
    email: string;
    profpic: string;
    name: string;
    description?: string;
    article?: IArticle[];
    sastra?: ISastra[];
    interaksi?: string[];
  }
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
  