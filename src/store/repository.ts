import { addDoc, doc, updateDoc, arrayUnion, arrayRemove, collection, query, getDocs, where, documentId, deleteDoc } from "firebase/firestore";
import { ref } from "vue";
import { store } from "./firestore";

export type Text = {
  id: string;
  teks: string | undefined;
  status: boolean;
};
export type Category = {
  id: string;
  name: string;
  image: string;
  list: Text[];
};
export type IdentyImg = {
  work: string;
  music: string;
  travel: string;
  book: string;
  home: string;
  desc: string;
  note: string;
};
const category = ref<Category>({
  id: "",
  name: "",
  image: "",
  list: [],
});
export const getAllCategory = async (): Promise<Category[]> => {
  const categories = ref<Category[]>([]);
  const querySnapshot = await getDocs(collection(store, "category"));
  querySnapshot.forEach((category) => {
    categories.value.push({
      id: category.id,
      name: category.data().name,
      image: category.data().image,
      list: category.data().list,
    });
  });
  return categories.value;
};

export const postCategory = async (text: string) => {
  await addDoc(collection(store, "category"), {
    name: text,
    image: "desc",
    list: [],
  });
};

export const getCategory = async (id: string): Promise<Category> => {
  const q = query(collection(store, "category"), where(documentId(), "in", [id]));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    category.value = {
      id: doc.id,
      image: doc.data().image,
      name: doc.data().name,
      list: doc.data().list,
    };
  });
  return category.value;
};

export const deleteCategory = async (id: string) => {
  await deleteDoc(doc(store, "category", id));
};

export const createNote = async (id: string, dataInput: Text) => {
  const washingtonRef = doc(store, "category", id.toString());
  await updateDoc(washingtonRef, {
    list: arrayUnion(dataInput),
  });
};

export const changeNote = async (id: string, beforeUpdate: Text, afterUpdate: Text) => {
  const note = doc(store, "category", id);
  await updateDoc(note, {
    list: arrayRemove(beforeUpdate),
  });
  await updateDoc(note, {
    list: arrayUnion(afterUpdate),
  });
};

export const deleteNote = async (id: string, target: Text) => {
  const note = doc(store, "category", id);
  await updateDoc(note, {
    list: arrayRemove(target),
  });
};
