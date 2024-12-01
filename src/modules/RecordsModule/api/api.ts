import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { IRecord } from "../ui/RecordsList/RecordsList";
import { db } from "../../store/store";

export const getRecordsData = async () => {
  const querySnapshot = await getDocs(collection(db, "records"));
  const responce: IRecord[] = [];
  querySnapshot.forEach((doc) => {
        //@ts-ignore
    responce.push({ id: doc.id, ...(doc.data() as IRecord) });
  });
  return responce;
};

export const  getDataById = async(docId:string) => {
  const docRef = doc(db, "records", docId); 
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    }
  } else {
    return null
  }
}

export const updateRecordById = async(data:IRecord) => {
  const washingtonRef = doc(db, "records", data.id);

  const docSnap = await updateDoc(washingtonRef, {...data});
  
  return docSnap

}
