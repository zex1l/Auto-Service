import { addDoc, collection } from "firebase/firestore";
import { db } from "../../store/store";
import { IRecord } from "../../RecordsModule/ui/RecordsList/RecordsList";

export const addNewRecord = async (data:IRecord) => {
  try {
    // Создаем новую запись в коллекции 'users'
    const docRef = await addDoc(collection(db, "records"), data);
    console.log(docRef);
    return {
      status: 200,
    };
  } catch (e) {
    return {
      status: 400,
    };
  }
};
