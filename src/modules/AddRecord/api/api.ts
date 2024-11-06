import { addDoc, collection } from "firebase/firestore";
import { db } from "../../store/store";


export const addNewRecord = async(data) => {

    try {
        // Создаем новую запись в коллекции 'users'
        const docRef = await addDoc(collection(db, 'records'), {
            ...data,
            status: 'В процессе'
        });
        console.log(docRef)
        return {
            status: 200
        }

      } catch (e) {
        return {
            status: 400
        }
      }
}