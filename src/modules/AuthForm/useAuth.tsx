import { useState, useEffect } from "react";
import { auth } from "../store/store";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch } from "../../redux/store";
import { resetCart } from "../../redux/slices/cartSlice";
import { createBasket } from "../Goods/api/api";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User | null>();
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useAppDispatch()

  const onError = (text: string) => {
    messageApi.open({
      type: "error",
      content: text,
    });
  };

  const onSuccess = (text: string) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    setIsLoading(false);
    return () => {
      listen();
    };
  }, []);

  const onHandleLogout = () => {
    signOut(auth)
      .then(() => console.log("success"))
      .catch((e) => console.log(e));

    dispatch(resetCart())
  };

  const onLoginUser = (email: string, password: string) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser(user.user);
        user.user.email === 'admin@mail.ru' ? navigate('/records') : navigate('/')
      })
      .catch(() => {
        setError("Неправильный email пользователя или пароль");
        onError("Упс, что-то пошло не так, попробуйте еще раз.");
      });
    setIsLoading(false);
  };

  const handleRegistrationUser = (email: string, password: string) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser(user.user);
        createBasket(user.user.uid)
        onSuccess("Вы успешно зарегистрировали аккаунт");
        navigate("/");
      })
      .catch(() => {
        setError("Неправильный email пользователя или пароль");
        onError("Упс, что-то пошло не так, попробуйте еще раз.");
      });
    setIsLoading(false);
  };

  return {
    user,
    error,
    isLoading,
    onLoginUser,
    onHandleLogout,
    handleRegistrationUser,
    contextHolder,
  };
};

export default useAuth;
