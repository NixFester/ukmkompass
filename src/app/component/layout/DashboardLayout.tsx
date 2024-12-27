'use client'
import React, { useContext } from "react";
import { Sidebar} from "flowbite-react";
import { AuthContext } from "../../context/AuthContext";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { FaEdit, FaHome,FaPenFancy } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdAccountCircle } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";

export default function DashboardLayout({
    children,
    }: {
    children: React.ReactNode;
}) {
    const router = useRouter();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Article must be used within AuthProvider");
  }
  const { profile, logOut } = authContext;

  const [openModal, setOpenModal] = React.useState(false);
  const [bukaSidebar, setSidebar] = React.useState(true)

  const renderingChoice = profile ? (
    profile.id === "111115487387317431655" ? (
      <Sidebar.ItemGroup>
            <Sidebar.Item icon={RxHamburgerMenu} onClick={() => setSidebar(!bukaSidebar)}>Dashboard </Sidebar.Item>
        <Sidebar.Item icon={FaEdit} href="/dashboard/sensor">Penanganan Sensor</Sidebar.Item>
        <Sidebar.Item icon={FaHome} href="/">Beranda</Sidebar.Item>
        <Sidebar.Item  icon={CiLogout}
          className="cursor-pointer"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {" "}
          Log Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    ) : (
      <Sidebar.ItemGroup>
            <Sidebar.Item icon={RxHamburgerMenu} onClick={() => setSidebar(!bukaSidebar)} className="cursor-pointer">Tutup Sidebar </Sidebar.Item>

        <Sidebar.Item icon={MdAccountCircle} href="/dashboard/akun">Akun</Sidebar.Item>
        <Sidebar.Item icon={IoNewspaperOutline} href="/dashboard/penulisan">Berita</Sidebar.Item>
        <Sidebar.Item icon={FaPenFancy} href="/dashboard/sastra">Sastra</Sidebar.Item>
        <Sidebar.Item icon={FaHome} href="/">Beranda</Sidebar.Item>
        <Sidebar.Item icon={CiLogout}
          className="cursor-pointer"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {" "}
          Log Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    )
  ) : (
    <Sidebar.ItemGroup>
      <Sidebar.Item href="#">loading</Sidebar.Item>
    </Sidebar.ItemGroup>
  );

  return (
    <div className=" flex flex-row transition-all bg-gray-50 ">
      {bukaSidebar && <div className=" lg:w-[8%] w-[40%] z-50 h-screen  transition-all fixed top-0 left-0 ">
        <Sidebar className="">
          <Sidebar.Items>
            {renderingChoice}
          </Sidebar.Items>
        </Sidebar>
      </div>}
      <div className={`${!bukaSidebar?"fixed":"hidden"} top-4 left-0 z-50`}>
          <Button color="gray" onClick={() => setSidebar(!bukaSidebar)}>
            {bukaSidebar ? 'Tutup Sidebar' : 'Buka Sidebar'}
          </Button>
      </div>
      <div className={!bukaSidebar?" w-full lg:pt-12":"w-full lg:pl-[13%]"} >
        <main>{children}</main>
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
              Apa anda yakin ingin Log Out dari situs?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className=" bg-red-500 text-white"
                onClick={async () => {
                  logOut();
                  router.push("/");
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
  );
}
