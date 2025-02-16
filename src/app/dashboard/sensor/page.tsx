'use client'
import * as React from "react";
import { ArticleContext } from "../../context/ArticleContext";
import { updateLolosSensor, hapusArtikel } from "../../api/userApi";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "../../tootltip.css"


export default function PenangananSensor() {
    const router = useRouter();
    const ReactQuill = React.useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }),[]);

  const articleContext = React.useContext(ArticleContext);
  if (!articleContext) {
    throw new Error("Profile must be used within AuthProvider");
  }
  const { belumLulusSensor } = articleContext;
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <div className="my-5 ml-20 p-4 border-2">
      <p className="text-2xl font-bold">Post yang belum dikaji:</p>
      {belumLulusSensor &&
        belumLulusSensor.map((article) => (
          <div
            key={article.id}
            className="p-4 border-2 border-black rounded-md my-4"
          >
            <h3 className="text-lg font-bold">{article.title}</h3>
            {article.image && (
              <img
                src={article.image}
                alt="Article"
                className="mt-2 mb-4 w-full h-auto"
              />
            )}
            <div>
            <ReactQuill
            readOnly={true}
            value={article.body}
            theme="bubble"
            />
            </div>
          
            <div className=" flex flex-row justify-end gap-12">
              <Button
                onClick={() => {
                  updateLolosSensor(article.id);
                  router.push('/')}}
              >
                Lulus Sensor
              </Button>
              <Button onClick={() => setOpenModal(true)}>
                Tidak Lulus Sensor
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
        ))}
    </div>
  );
}
