'use client'
import { useState } from "react";
import Card from "./Card";
import { Pagination } from "flowbite-react";

export interface IListArtikelProps {
  Kategori: 1 | 2 | 3 | 4;
  searchQuery?: string; // Add searchQuery prop
  isiBlog?: IIsiBlog[]
}

export default function ListArtikel({
  Kategori,
  searchQuery,
  isiBlog
}: IListArtikelProps) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const onPageChange = (page: number) => setCurrentPage(page);

  if (!isiBlog || isiBlog.length === 0) {
    return <p>Loading Artikel...</p>;
  }

  // Filter articles by category
  let filteredArticles =
    Kategori === 1
      ? isiBlog
      : Kategori === 2
        ? isiBlog.filter((item) => !item.sastra)
        : isiBlog.filter((item) => item.sastra);

  // Further filter articles based on the search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredArticles = isiBlog.filter((article) =>
      article.title.toLowerCase().includes(query)
    );
  }

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  return (
    <div className="lg:w-8/12">
      {searchQuery && (
        <div className="mt-10">
          <p className=" font-poppins text-center text-3xl">
            Hasil Pencarian Untuk {searchQuery}
          </p>
        </div>
        )}
        {currentPage === 1 && Kategori !== 4 && (
          <Card 
            key="mypost"
            sastra={false}
            urlGambar="/KomPaSSPancasaktiHD.png"
            title="Tata Cara Menggunakan Website ini"
            body="Website ini dirancang agar mudah digunakan di komputer/laptop maupun ponsel. Meskipun tata letak halaman utama berbeda, fitur login..."
            href="/guide"
          />
        )}
        {paginatedArticles.map((article) => (
          <Card
            sastra={article.sastra}
            key={article.id}
            urlGambar={article.image}
            title={article.title}
            body={
          article.body
            ? article.body.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 200) + "..."
            : ""
            }
            href={(article.sastra ? "/sastra/" : "/artikel/") + article.id}
          />
        ))}
      <div className="flex overflow-x-auto sm:justify-center">
        {filteredArticles.length > itemsPerPage && ( // Render pagination only if there are more articles than itemsPerPage
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
              previousLabel=""
              nextLabel=""
            />
          </div>
        )}
      </div>
    </div>
  );
}
