import {
  setDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  getFirestore
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { db } from "../../../firebaseconfig/firebaseconfig";

export const get_users = {
  user: {
    // Buscar um usuário pelo ID ou retornar todos
    get: async (id) => {
      if (id) {
        const docSnap = await getDoc(doc(db, "users", id));
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.log("Usuário não encontrado.");
          return {};
        }
      }

      // Retorna todos os usuários
      const querySnapshot = await getDocs(collection(db, "users"));
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
    },

    // Criar novo usuário
    post: async (payload) => {
      const { email, password, name, lastName } = payload;
      const auth = getAuth();

      try {
        // Cria o usuário com Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Atualiza o nome do perfil
        await updateProfile(user, { displayName: `${name} ${lastName}` });

        const firestore = getFirestore();
        const usersCollection = collection(firestore, "users");

        // Verifica se o email já está cadastrado no Firestore
        const emailQuery = query(usersCollection, where("email", "==", email));
        const emailQuerySnapshot = await getDocs(emailQuery);
        if (!emailQuerySnapshot.empty) {
          alert("O email já está sendo usado por outro usuário.");
          return;
        }

        // Usa o UID do Auth como ID do documento
        await setDoc(doc(usersCollection, user.uid), {
          email,
          name,
          lastName,
          createdAt: new Date()
        });

        console.log("Usuário criado com sucesso:", user.uid);
        window.location.replace("/");
      } catch (error) {
        console.error("Erro ao criar usuário:", error.message);
        alert("Erro ao criar usuário: " + error.message);
      }
    },

    // Atualizar URL da foto do usuário
    editPhoto: async (id, newUrl) => {
      if (!id || !newUrl) {
        console.log("ID ou nova URL não fornecidos.");
        return;
      }

      try {
        const userDocRef = doc(db, "users", id);
        await updateDoc(userDocRef, { photoUrl: newUrl });
        console.log("Foto atualizada com sucesso");
      } catch (error) {
        console.error("Erro ao atualizar a foto:", error.message);
        alert("Erro ao atualizar a foto.");
      }
    }
  }
};
