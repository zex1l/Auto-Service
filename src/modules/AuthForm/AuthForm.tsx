import { FormEvent, useState } from "react";
import css from "./AuthForm.module.scss";
import { Form, Button, Input } from "antd";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../store/store";

interface IUser {
  email: string;
  password: string;
}

const AuthForm = () => {
  const [userData, setUserData] = useState<IUser>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onHadleSubmit = async () => {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        setUserData({
          email: "",
          password: "",
        });
        navigate("/records");
      })
      .catch((error) => {
        console.error("Ошибка настройки сессии:", error);
      });
  };

  const onHandleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <>
      <h2>Вход</h2>
      <Form className={css.form} layout="vertical">
        <Form.Item
          label="Имя"
          name="email"
          rules={[{ required: true, message: "Пожалуйста заполните это поле" }]}
        >
          <Input
            onChange={onHandleChange}
            name="email"
            value={userData.email}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Пожалуйста заполните это поле" }]}
        >
          <Input.Password
            onChange={onHandleChange}
            name="password"
            value={userData.password}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={onHadleSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AuthForm;
