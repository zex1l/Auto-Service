import { Layout as AntLayout } from "antd";
import { Link, useParams } from "react-router-dom";
const { Header } = AntLayout;
import css from "./CustomHeader.module.scss";
import useAuth from "../../modules/AuthForm/useAuth";
import AddRecords from "../../modules/AddRecord/AddRecords";
import LogoImg from "../../assets/image/7941439.jpg";
import Button from "../Button/Button";

const CustomHeader = () => {
  const { user, onHandleLogout } = useAuth();

  return (
    <Header className={css.header}>
      <Link to={"/"}>
        <img src={LogoImg} width={80} height={80} alt="" />
      </Link>
      <nav className={css.header__navigate}>
        <ul className={css.header__link_list}>
          <li>
            <Link className="custom__link" to={"/"}>
              О нас
            </Link>
          </li>
          {user?.email === "admin@mail.ru" && (
            <>
              <li>
                <Link className="custom__link" to={"/records"}>
                  Админ панель
                </Link>
              </li>
            </>
          )}
          <li>
            <Link className="custom__link" to={"/goods"}>
              Товары и услуги
            </Link>
          </li>
          {user && user?.email !== "admin@mail.ru" && (
            <>
              <li>
                <Link className="custom__link" to={"/lk"}>
                  Личный кабинет
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className={css.header__btn}>
        <AddRecords />
        {user && (
          <Button className="custom__link" onClickHandler={onHandleLogout}>
            Выйти
          </Button>
        )}
        {!user ? (
         <RenderButton/>
        ) : null}
      </div>
    </Header>
  );
};

const RenderButton = () => {
  const path = location.pathname;
  if(path === '/login') return null
  return (
    <Link to={"/login"}>
    <Button className="custom__link">Войти</Button>
  </Link>
  )
}

export default CustomHeader;
