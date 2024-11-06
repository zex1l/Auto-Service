import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IRecord } from "../ui/RecordsList/RecordsList";
import { db } from "../../store/store";

export const getRecordsData = async () => {
  const querySnapshot = await getDocs(collection(db, "records"));
  const responce: IRecord[] = [];
  querySnapshot.forEach((doc) => {
    responce.push({ id: doc.id, ...(doc.data() as IRecord) });
  });
  return responce;
};

export const  getDataById = async(docId:string) => {
  const docRef = doc(db, "records", docId); 
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Данные документа:", docSnap.data());
  } else {
    console.log("Документ не найден");
  }
}
