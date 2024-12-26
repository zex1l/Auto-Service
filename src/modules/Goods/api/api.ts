import {
  getDocs,
  collection,
  doc as firebaseDoc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';

import { db } from '../../store/store';

export type BasketType = {
  userId: string;
  goods: string[];
};

export const getBasketData = async (userId: string) => {
  const querySnapshot = await getDocs(collection(db, 'basket'));

  const responce: BasketType[] = [];

  querySnapshot.forEach((doc) => {
    const result = doc.data() as BasketType;
    result.userId === userId ? responce.push(result) : null;
  });

  return responce;
};

export const addBasketData = async (userId: string, goodId: string) => {
  const querySnapshot = await getDocs(collection(db, 'basket'));
  let data: BasketType | null = null;
  querySnapshot.forEach(async (doc) => {
    const result = doc.data() as BasketType;

    console.log(doc.data());
    if (result.userId === userId) {
      data = {
        ...result,
        goods: [...result.goods, goodId],
      };

      const basketRef = firebaseDoc(db, 'basket', doc.id);
      const docSnap = await updateDoc(basketRef, { ...data });
      return docSnap;
    } else {
      return data;
    }
  });
};

export const deleteBasketData = async (userId: string, goodId: string) => {
  const querySnapshot = await getDocs(collection(db, 'basket'));
  let data: BasketType | null = null;
  let basketRef = null;
  let result: BasketType | any;

  querySnapshot.forEach(async (doc) => {
    result = doc.data() as BasketType;

    if (result.userId === userId) {
      basketRef = firebaseDoc(db, 'basket', doc.id);
    }
  });

  if (basketRef && result) {
    const index = result.goods.indexOf(goodId);

    if (index === -1) return await updateDoc(basketRef, { ...result });

    data = {
      ...result,
      //@ts-expect-error
      goods: result.goods.filter((_, indexItem) => indexItem !== index),
    };

    return await updateDoc(basketRef, { ...data });
  }
};

export const createBasket = async (userId: string) => {
  const querySnapshot = await getDocs(collection(db, 'basket'));
  let data;
  querySnapshot.forEach(async (doc) => {
    const result = doc.data() as BasketType;
    if (result.userId !== userId) {
      const docRef = await addDoc(collection(db, 'basket'), {
        goods: [],
        userId: userId,
      } as BasketType);
      data = docRef;
    }
  });

  return data;
};
