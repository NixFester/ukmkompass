'use client'
import React, { useContext, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Label, Textarea, Button, Modal } from "flowbite-react";
import { handleComment } from "../api/userApi";
import { ArticleContext } from "../context/ArticleContext";
import { v4 as uuidv4 } from "uuid";
export interface IKomentarProps {
  profpic: string;
  name: string;
  idArtikel: string;
  idPengguna: string;
  sastra: boolean;
}

export default function Komentar(props: IKomentarProps) {
  const [isiKomentar, setIsiKomentar] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const articleContext = useContext(ArticleContext);
  if (!articleContext) {
    throw new Error("Article must be used within AuthProvider");
  }
  const { articles, setArticlesState } = articleContext;

  // posting komentar
  const handleClick = async () => {
    const targetArticle = articles.find((x) => x.id === props.idArtikel);
    const komentarBaru: komentarTemplate = {
      idKomentar: uuidv4(),
      userId: props.idPengguna,
      userName: props.name,
      profpic: props.profpic,
      isiKomentar: isiKomentar,
      like: 0,
      dislike: 0,
      timestamp: new Date(),
      type: props.sastra,
    };
    try {
      await handleComment(
        props.idArtikel,
        komentarBaru,
      ).then(() => {
        alert("Komentar berhasil di posting!");
        if (targetArticle) {
          console.log("ganti komentar baru");

          targetArticle.komentar = targetArticle.komentar
            ? [...targetArticle.komentar, komentarBaru]
            : [komentarBaru];
          setArticlesState((prev) => [...prev, targetArticle]);
        }
        setOpenModal(false);
        setIsiKomentar("")
      });
    } catch (error) {
      console.error("Kesalahan!", error);
    }
  };

  return (
    <div className=" text-3xl w-full my-5 bg-white p-8 mt-5 shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-lg transition-all">
      <div>
        <div className="mb-2 block ">
          <Label htmlFor="comment" value="Komentar" />
        </div>
        <Textarea
          id="comment"
          placeholder="Beri Komentar..."
          rows={4}
          value={isiKomentar}
          onChange={(e) => setIsiKomentar(e.target.value)}
        />
        <Button
          className=" bg-red-600 text-white font-bold text-2xl my-4"
          onClick={() => setOpenModal(true)}
        >
          Post Komentar
        </Button>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Apa anda yakin ingin berkomentar?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className=" bg-red-600 text-white" onClick={() => handleClick()}>
                Ya! Tentu
              </Button>
              <Button className=" "onClick={() => setOpenModal(false)}>
                Tidak! Kembali
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
