import axios from 'axios';

const BASE_URL = '/api';

export const saveDesc = async (id: string, description: string): Promise<any> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/saveuserdes`, { id, description });
    console.log("Description saved:", data);
    return data;
  } catch (err) {
    console.error("Error saving Description:", err);
    throw err;
  }
};

export const saveName = async (id: string, name: string): Promise<any> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/saveusername`, { id, name });
    console.log("Username saved:", data);
    return data;
  } catch (err) {
    console.error("Error saving Username:", err);
    throw err;
  }
};

export const modifyUser = async (user: UserProfile): Promise<any> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user`, user);
    console.log("User saved:", data);
    return data;
  } catch (err) {
    console.error("Error saving user:", err);
    throw err;
  }
};

export const handleArtikel = async (
  id: string,
  artikel: ISastra
): Promise<any> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/${id}/article`, { ...artikel });
    console.log("Sastra saved:", data);
    return data;
  } catch (err) {
    console.error('Error saving Sastra:', err);
    throw err;
  }
};

export const uploadImage = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data } = await axios.post(`${BASE_URL}/imageupload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Image uploaded:", data);
    return data;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};

export const saveSastra = async (id: string, sastra: any): Promise<any> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/sastra`, { id, sastra });
    console.log("Sastra saved:", data);
    return data;
  } catch (err) {
    console.error("Error saving sastra:", err);
    throw err;
  }
};

export const tambahKomentar = async (
  idArtikel: string,
  isiKomentar: komentarTemplate,
  sastra: boolean
): Promise<any> => {
  const url = `${BASE_URL}/users/${sastra ? "sastra" : "article"}/${idArtikel}/comment`;

  try {
    const { data } = await axios.post(url, { ...isiKomentar });
    return data;
  } catch (err) {
    console.error("Error adding comment:", err);
    throw err;
  }
};

export const hapusKomentar = async (
  idPenulis: string,
  idArtikel: string,
  idKomentar: string,
  sastra: boolean
): Promise<any> => {
  const url = `${BASE_URL}/users/${idPenulis}/${sastra ? "sastra" : "article"}/${idArtikel}/comment/${idKomentar}`;
  try {
    const { data } = await axios.delete(url);
    return data;
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err;
  }
};

export const updateLolosSensor = async (artikelId: string): Promise<void> => {
  try {
    const response = await axios.put(`${BASE_URL}/lulusSensor/${artikelId}`);
    console.log(`Artikel with ID ${artikelId} was successfully updated:`, response.data);
  } catch (err) {
    console.error("Error updating artikel:", err);
    throw err;
  }
};

export const fetchUserById = async (id: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user/${id}`);
    return data;
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }
};

export const getUserBasedOnArticle = async (id: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/article/${id}/user`);
    return data;
  } catch (err) {
    console.error("Error fetching user based on article ID:", err);
    throw err;
  }
};

export const getUserBasedOnSastraId = async (id: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/sastra/${id}/user`);
    return data;
  } catch (err) {
    console.error("Error fetching user based on sastra ID:", err);
    throw err;
  }
};

export const handleComment = async (
  idArtikel: string,
  isiKomentar: komentarTemplate,
): Promise<any> => {
  const url = `${BASE_URL}/komentar/${idArtikel}`;

  try {
    const { data } = await axios.post(url, { ...isiKomentar });
    return data;
  } catch (err) {
    console.error("Error adding comment:", err);
    throw err;
  }
};

export const handleSastra = async (
  id: string,
  artikel: ISastra
): Promise<any> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/${id}/sastra`, { ...artikel });
    console.log("Sastra saved:", data);
    return data;
  } catch (err) {
    console.error('Error saving Sastra:', err);
    throw err;
  }
};

export const hapusArtikel = async (artikelId: string): Promise<void> => {
  const url = `${BASE_URL}/hapusArtikel/${artikelId}`;
  try {
    const { data } = await axios.delete(url);
    console.log("Artikel deleted:", data);
  } catch (err) {
    console.error("Error deleting artikel:", err);
    throw err;
  }
};