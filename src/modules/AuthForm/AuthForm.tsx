import { FormEvent, useEffect, useState } from "react";
import css from "./AuthForm.module.scss";
import { Form, Button, Input } from "antd";
import useAuth from "./useAuth";
import Loader from "../../ui/Loader/Loader";
import Error from "../../ui/Error/Error";
import { useNavigate } from "react-router-dom";

interface IUser {
  email: string;
  password: string;
}

const AuthForm = () => {
  const [userData, setUserData] = useState<IUser>({
    email: "",
    password: "",
  });
  const { isLoading, onLoginUser, error, user } = useAuth();
  const navigate = useNavigate();

  const onHadleSubmit = () => {
    onLoginUser(userData.email, userData.password);
  };

  const onHandleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(user);
    if (user) navigate("/records");
  }, [user]);

  return (
    <>
      <h2>Вход</h2>
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
              Войти
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default AuthForm;
