import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt5EwWSgc1prLfl7FaTBHAXLo2G_Y3Lro",
  authDomain: "diplom-fd158.firebaseapp.com",
  projectId: "diplom-fd158",
  storageBucket: "diplom-fd158.firebasestorage.app",
  messagingSenderId: "42622530955",
  appId: "1:42622530955:web:992ccc449ae43d9d8aab8e"
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;