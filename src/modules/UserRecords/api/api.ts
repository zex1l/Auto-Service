import { collection, doc, getDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { IRecord } from "../../RecordsModule/ui/RecordsList/RecordsList";
import { db } from "../../store/store";
import { User } from "firebase/auth";

export const getRecordsData = async (user:User) => {
  if(!user) return
  const querySnapshot = await getDocs(collection(db, "records"));
  const responce: IRecord[] = [];
  querySnapshot.forEach((doc) => {
    //@ts-ignore
    responce.push({ id: doc.id, ...(doc.data() as IRecord) });
  });
  return responce.filter(record => user.uid === record.userId);
};


export const cancelRecord = async (data:IRecord) => {
  try {
    const docRef = doc(db, "records", data.id);
    const response = await updateDoc(docRef, {...data, status: 'Отказ'});
    console.log(response);
    return {
      status: 200,
    };
  } catch (e) {
    return {
      status: 400,
    };
  }
};
