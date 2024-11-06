import {
  useState,
  useEffect,
} from "react";
import { auth } from "../store/store";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>();

  const navigate = useNavigate()

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

  const onLoginUser = (email:string, password:string) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then(
      (user) => {
        setUser(user.user)
        navigate("/records");
      }
    )
    .catch(() => setError("Неправильный email пользователя или пароль"))
    setIsLoading(false)
  }



  return {
    user,
    error,
    isLoading,
    onLoginUser,
    onHandleLogout
  }
};

export default useAuth;
