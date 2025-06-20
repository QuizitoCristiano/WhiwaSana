// storageService.js (arquivo separado para funções de storage)



import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseconfig/firebaseconfig";

export const uploadFile = async (file, path) => {
  if (!file) return null;

  const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
  const storageRef = ref(storage, `${path}/${fileName}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Erro no upload:", error);
    return null;
  }
};


