'use client'
import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "flowbite-react";
import { saveDesc, saveName } from "../../api/userApi";
import Image from "next/image";

export default function AkunLayout() {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("Auth must be used within AuthProvider");
  }
  const { profile, setProfileState } = authContext;

  const [editState, setEdit] = React.useState(true);
  const [editNamaState, setEditNama] = React.useState(true);

  const [deskripsi, setDeskripsi] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [deskBackup, setBackup] = React.useState("");
  React.useEffect(() => {
    if (!profile) {
      setDeskripsi("");
      setUserName("");
    } else {
      setDeskripsi(profile.description ? profile.description : "");
      setUserName(profile.name);
    }
  }, [profile]);

  if (!profile) {
    return (<div>loading...</div>)
  }

  return (
    <div className=" -mt-10 ">
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-2 py-2 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className=" mx-auto">
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold">Selamat Datang,</h1>
                <h1 className="text-2xl font-semibold">
                  {profile && profile.name}
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className=" text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {/* Profile Information */}
                  {profile && (
                    <div className="text-center lg:mt-4">
                      <div className="flex justify-center">
                        {<Image src={`/api/proxy-image?imageUrl=${encodeURIComponent(profile.profpic)}`}
                                                        alt="gambar"
                                                        height={128}
                                                        width={128} />}
                      </div>
                      <p className="text-sm text-gray-600 my-4">
                        {" "}
                        Email: {profile.email}
                      </p>

                      {editNamaState ? (
                        <div className="flex flex-col my-4">
                          <p>Nama: {username}</p>
                          <Button
                            className=" justify-self-end"
                            onClick={() => {
                              setEditNama((prev) => !prev);
                              setBackup(username);
                            }}
                          >
                            {" "}
                            Edit Username
                          </Button>
                        </div>
                      ) : (
                        <div className=" mt-4">
                          <textarea
                            value={username}
                            onChange={(e) => {
                              setUserName(e.target.value);
                            }}
                          ></textarea>
                          <div className="flex mt-2 gap-2 lg:my-2 justify-center ">
                            <Button
                              className=" lg:justify-self-end"
                              onClick={() => {
                                setEditNama((prev) => !prev);
                                saveName(profile.id, username)
                                  .then(() => {
                                    alert("Username Diganti!");
                                    setProfileState((prev) => {
                                      if (prev) {
                                        prev.description = deskripsi;
                                      }
                                      return prev;
                                    });
                                    localStorage.setItem(
                                      "profile",
                                      JSON.stringify(profile)
                                    );
                                  })
                                  .catch((e) => {
                                    alert("error" + e);
                                  });
                              }}
                            >
                              {" "}
                              Ganti Username
                            </Button>
                            <Button
                              className=" lg:justify-self-end"
                              onClick={() => {
                                setEditNama((prev) => !prev);
                                setUserName(deskBackup);
                              }}
                            >
                              {" "}
                              Batal
                            </Button>
                          </div>
                        </div>
                      )}
                      {editState ? (
                        <div className="flex flex-col my-4">
                          <p>{deskripsi}</p>
                          <Button
                            className=" justify-self-end"
                            onClick={() => {
                              setEdit((prev) => !prev);
                              setBackup(deskripsi);
                            }}
                          >
                            {" "}
                            Edit Deskripsi
                          </Button>
                        </div>
                      ) : (
                        <div className=" mt-4">
                          <textarea
                            value={deskripsi}
                            onChange={(e) => {
                              setDeskripsi(e.target.value);
                            }}
                          >
                            {deskripsi}
                          </textarea>
                          <div className="flex gap-2 lg:my-2 justify-center">
                            <Button
                              className=" lg:justify-self-end"
                              onClick={() => {
                                setEdit((prev) => !prev);
                                saveDesc(profile.id, deskripsi)
                                  .then(() => {
                                    alert("Deskripsi Diganti!");
                                    setProfileState((prev) => {
                                      if (prev) {
                                        prev.description = deskripsi;
                                      }
                                      return prev;
                                    });
                                    localStorage.setItem(
                                      "profile",
                                      JSON.stringify(profile)
                                    );
                                  })
                                  .catch((e) => {
                                    alert("error" + e);
                                  });
                              }}
                            >
                              {" "}
                              Ganti Deskripsi
                            </Button>
                            <Button
                              className=" lg:justify-self-end"
                              onClick={() => {
                                setEdit((prev) => !prev);
                                setDeskripsi(deskBackup);
                              }}
                            >
                              {" "}
                              Batal
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
