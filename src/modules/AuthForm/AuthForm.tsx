import { FormEvent, useState } from "react";
import css from "./AuthForm.module.scss";
import { Form, Button, Input, message } from "antd";
import useAuth from "./useAuth";
import Loader from "../../ui/Loader/Loader";
import Error from "../../ui/Error/Error";
import { Link } from "react-router-dom";

interface IUser {
  email: string;
  password: string;
}

type Props = {
  type: "sign-in" | "sign-up";
};

const AuthForm = ({ type }: Props) => {
  const [userData, setUserData] = useState<IUser>({
    email: "",
    password: "",
  });
  const { isLoading, onLoginUser, error, user, handleRegistrationUser } = useAuth();

  const onHadleSubmit = () =>
    type === "sign-in"
      ? onLoginUser(userData.email, userData.password)
      : handleRegistrationUser(userData.email, userData.password);

  const onHandleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <>
      <h2>{type === "sign-in" ? "Войти" : "Зарегистрироваться"}</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <Form className={css.form} layout="vertical">
          <Form.Item
            label="Имя"
            name="email"
            rules={[
              { required: true, message: "Пожалуйста заполните это поле" },
            ]}
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
            rules={[
              { required: true, message: "Пожалуйста заполните это поле" },
            ]}
          >
            <Input.Password
              onChange={onHandleChange}
              name="password"
              value={userData.password}
            />
          </Form.Item>
          {error && <Error text={error} />}
          <Form.Item>
            <Button onClick={onHadleSubmit} type="primary" htmlType="submit">
              {type === "sign-in" ? "Войти" : "Зарегистрироваться"}
            </Button>
            <Link className={css.form__link} to={type === "sign-in" ? "/signUp" : "/login"}>
              {type === "sign-in" ? "Зарегистрироваться" : "Войти"}
            </Link>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default AuthForm;
