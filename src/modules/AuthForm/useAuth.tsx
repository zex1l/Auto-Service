import {
  useState,
  useEffect,
} from "react";
import { auth } from "../store/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { User } from "firebase/auth";


const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setIsLoading(true)
    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
      });
      setIsLoading(false)
      return () => {
        listen();
      };
  }, []);

  const onHandleLogout = () => {
    signOut(auth)
      .then(() => console.log("success"))
      .catch((e) => console.log(e));
  }



  return {
    user,
    isLoading,
    onHandleLogout
  }
};

export default useAuth;
