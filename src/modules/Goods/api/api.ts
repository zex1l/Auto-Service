import {
  getDocs,
  collection,
  doc as firebaseDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

import { db } from "../../store/store";

export type BasketType = {
  userId: string;
  goods: string[];
};

export const getBasketData = async (userId: string) => {
  const querySnapshot = await getDocs(collection(db, "basket"));

  const responce: BasketType[] = [];

  querySnapshot.forEach((doc) => {
    const result = doc.data() as BasketType;
    result.userId === userId ? responce.push( result) : null;
  });

  return responce
};

export const addBasketData = async (userId: string, goodId: string) => {
  const querySnapshot = await getDocs(collection(db, "basket"));
  let data: BasketType | null = null;
  querySnapshot.forEach(async (doc) => {
    const result = doc.data() as BasketType;
    if (result.userId === userId) {
      data = {
        ...result,
        goods: [...result.goods, goodId],
      };

      const basketRef = firebaseDoc(db, "basket", doc.id);
      const docSnap = await updateDoc(basketRef, { ...data });
      return docSnap;
    } else {
      return data;
    }
  });
};

export const createBasket = async (userId: string) => {
  const querySnapshot = await getDocs(collection(db, "basket"));
  let data;
  querySnapshot.forEach(async (doc) => {
    const result = doc.data() as BasketType;
    if (result.userId !== userId) {
      const docRef = await addDoc(collection(db, "basket"), {
        goods: [],
        userId: userId,
      } as BasketType);
      data = docRef;
    }
  });

  return data;
};
