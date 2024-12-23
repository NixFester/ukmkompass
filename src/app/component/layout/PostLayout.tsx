'use client'
import React, { useState, useEffect, useContext } from "react";
import { fetchUserById, handleArtikel, handleSastra } from "../../api/userApi";
import { AuthContext } from "../../context/AuthContext";
import axios, { AxiosResponse } from "axios";
import IsiWriter from "../../component/IsiWriter";

interface IWriter {
    bentuk:string
}

function ArtikelWriter(props: IWriter) {
  const [body, setBody] = useState<string>(""); // Empty string to avoid ReactQuill issues
  const [user, setUser] = useState<UserProfile | null>(null);
  const [title, setTitle] = useState<string>("");
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [file, setFile] = useState<File | null>(null); // Correctly type `file` as `File | null`
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Record<string, any>>({}); // Ensure `res` is correctly typed as an object
  const authContext = useContext(AuthContext);
  const [idArtikel, setIdArtikel] = useState<string | null>(null)
  const [imageUrl,setImageUrl] = useState<string|null>(null)
  const [komentar,setKomentar] = useState<komentarTemplate[]|null>(null)
  const [editArticleBody,setEditArticleBody] = useState<string>("")
  
  if (!authContext) {
    throw new Error("Profile must be used within AuthProvider");
  }
  const { profile } = authContext;

  // Fetch user data
  useEffect(() => {
    if (!profile || !profile.id) {
      return;
    } else {
      fetchUserById(profile.id).then((data) => setUser(data));
    }
  }, [profile]);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null; // Handle optional `files`
    setFile(selectedFile);
  };

  let response:null| AxiosResponse<any,any>

  // Handle article save
  const handleSaveArticle = async (bentuk:string) => {
    if (!user) {
      return alert("tidak ada user");
    }
    if (!file && bentuk === 'artikel') {
      if (!imageUrl) {
        return alert("Tolong upload gambar");
      }
    } else if (file) {
      const data = new FormData();
      data.append("my_file", file);

      response = await axios.post(
        "api/upload",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    }
    if (!title.trim() || !body.trim()) {
      return alert("tolong isi sama titlenya yang bener.");
    }
    

    try {
      setLoading(true);
      const imageURI = response?response.data.url: null
      

      const newArticle: IArticle = {
        id: idArtikel || Date.now().toString(), // Example unique ID, replace with backend logic
        title: title.trim(),
        body: editArticleBody || body.trim(),
        image: imageUrl || imageURI,
        komentar: komentar || [],
        like: 0,
        dislike: 0,
      };
      // Pass them as individual arguments
      if (bentuk === "artikel") {
        if (!newArticle) {
            return alert("Article is required!");
        } 
        await handleArtikel(user.id, newArticle).then(() => {

            alert("Article saved successfully!");
          setArticles([...articles, newArticle]);
          setTitle("");
          setBody("");
        });
      } else {
        await handleSastra(user.id, newArticle).then(() => {
          alert("Article saved successfully!");
          setArticles([...articles, newArticle]);
          setTitle("");
          setBody("");
        });
      }
      setLoading(false);
      alert("Artikel telah disimpan");
    } catch (error: any) {
      alert(error.message || "Something went wrong!");
    }
  };

  if (!user) {
    return (<div>loading...</div>)
  }

  return (
    <div>
      <IsiWriter
        bentuk={props.bentuk}
        handleSelectFile={handleSelectFile}
        file={file}
        res={res}
        loading={loading}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        handleSaveArticle={handleSaveArticle}
        user={user}
        setIdArtikel={setIdArtikel}
        setImageUrl={setImageUrl}
        setKomentar={setKomentar}
        setEditArticleBody={setEditArticleBody}
        editArticleBody={editArticleBody}
        imageUrl={imageUrl}
      />
    </div>
  );
}


export default ArtikelWriter;
