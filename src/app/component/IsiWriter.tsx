'use client'
import React,{ useMemo, useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Button,Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { hapusArtikel } from "../api/userApi";
import Image from "next/image";

export interface IIsiWriterProps {
  bentuk: string;
  handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  res: Record<string, any>;
  loading: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setIdArtikel: React.Dispatch<React.SetStateAction<string | null>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setKomentar: React.Dispatch<React.SetStateAction<komentarTemplate[] | null>>;
  setEditArticleBody: React.Dispatch<React.SetStateAction<string>>
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  handleSaveArticle: (bentuk:string) => Promise<void>;
  user: UserProfile | null;
  editArticleBody: string 
  imageUrl: string | null
}

export default function IsiWriter(props: IIsiWriterProps) {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }),[]);

  const router = useRouter()
  const [editArticle,setEditState] = useState(true)
  const [openModal,setOpenModal] = useState(false)

  useEffect(() => {
    const tooltips = document.querySelectorAll(".ql-tooltip");
    tooltips.forEach((tooltip) => {
      if (tooltip instanceof HTMLElement) {
        tooltip.style.display = editArticle ? "none" : "block";
      }
    });
  }, [editArticle]);

  const render =
    props.bentuk === "artikel"
      ? props.user &&
        props.user.article?.map((article) => (
          <div
            key={article.id}
            className={`p-4 border rounded-md mb-4 ${
              article.lolosSensor ? "" : "bg-gray-200 opacity-50"
            }`}
          >
            {article.image && (
              <img
                src={article.image} // Fetch from GridFS via backend
                alt="Article"
                className="mt-2 mb-4 w-full h-auto"
              />
            )}
            <h3 className="text-4xl font-bold">{article.title}</h3>
            <ReactQuill theme={editArticle?"bubble":"snow"} value={editArticle?article.body:props.editArticleBody} readOnly={editArticle} onChange={(content)=>props.setEditArticleBody(content)} />
            {!article.lolosSensor && 
              <div>
                <div className=" flex flex-row justify-end gap-12">
                  <Button
                    onClick={() => {
                      if (editArticle){
                        props.setIdArtikel(article.id)
                        props.setTitle(article.title)
                        props.setBody(article.body)
                        if (article.image) {props.setImageUrl(article.image)}
                        props.setKomentar(article.komentar)
                        
                      }
                      setEditState(!editArticle)

                    }}
                  >
                    {editArticle?"Edit Artikel": props.loading? "Loading":"Selesai Edit"}
                  </Button>
                  <Button color="failure" onClick={() => setOpenModal(true)}>
                    Hapus Postingan
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
                        Apa anda yakin ingin menghapus artikel?
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={async () => {
                            hapusArtikel(article.id);
                          }}
                        >
                          Ya! Tentu
                        </Button>
                        <Button onClick={() => setOpenModal(false)}>
                          Tidak! Kembali
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            }
          </div>
        ))
      : props.user &&
        props.user.sastra &&
        props.user.sastra?.map((article) => (
          <div key={article.id} className={`p-4 border rounded-md mb-4 ${
            article.lolosSensor ? "" : "bg-gray-200 opacity-80"
          }`}>
            {article.image && (
              <img
                src={article.image} // Fetch from GridFS via backend
                alt="Article"
                className="mt-2 mb-4 w-full h-auto"
              />
            )}
            <h3 className="text-4xl font-bold">{article.title}</h3>
            <ReactQuill theme={editArticle?"bubble":"snow"} value={editArticle?article.body:props.body} readOnly={editArticle} onChange={(content)=>props.setEditArticleBody(content)} />
            {!article.lolosSensor && 
              <div>
                <div className=" flex flex-row justify-end gap-12">
                  <Button
                    onClick={() => {
                      if (editArticle){
                        props.setIdArtikel(article.id)
                        props.setTitle(article.title)
                        props.setBody(article.body)
                        if (article.image) {props.setImageUrl(article.image)}
                        props.setKomentar(article.komentar)
                      }
                      setEditState(!editArticle)
                    }}
                  >
                    Edit Artikel
                  </Button>
                  <Button onClick={() => setOpenModal(true)}>
                    Hapus Artikel
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
                        Apa anda yakin ingin menghapus artikel?
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={async () => {
                            await hapusArtikel(article.id);
                            router.refresh();
                          }}
                        >
                          Ya! Tentu
                        </Button>
                        <Button onClick={() => setOpenModal(false)}>
                          Tidak! Kembali
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            }
          </div>
        ));

  return (
    <div className="lg:py-4 lg:pl-10 p-2 pt-14 overflow-hidden lg:overflow-auto">
      <div className="mb-6 text-xl font-semibold">
        <h2 className="">PENULISAN {props.bentuk.toUpperCase()}</h2>
        <h2>Gambar:</h2>
        {!props.imageUrl && <ImageUploader
          handleSelectFile={props.handleSelectFile}
          file={props.file}
          res={props.res}
          loading={props.loading}
        />}
        {props.imageUrl && (
          <Image src={`/api/proxy-image?imageUrl=${encodeURIComponent(props.imageUrl)}`}
                                          alt="gambar"
                                          className="absolute w-32 h-32 text-gray-400 "
                                          height={96}
                                          width={96} />
        )}
        <h2>Judul:</h2>
        <input
          type="text"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          className="w-full p-2 border rounded-md mb-2 font-normal"
          placeholder="Article Title"
        />
        <h2>Isi Artikel</h2>
        <ReactQuill
          value={props.body || ""} // Fallback to an empty string
          onChange={(content) => props.setBody(content)}
          className="mb-4 font-normal"
          theme="snow"
        />

        <Button
          onClick={()=>{props.handleSaveArticle(props.bentuk)}}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {props.loading ? "Loading" : "Kirim Artikel"}
        </Button>
      </div>

      {editArticle && (<div>
        <h2 className="text-xl font-semibold text-justify">
          {"Koleksi " + props.bentuk + "-mu, Yang berwarna abu-abu adalah artikel yang belum lulus sensor"}
        </h2>
        {render}
      </div>)}
      
    </div>
  );
}
