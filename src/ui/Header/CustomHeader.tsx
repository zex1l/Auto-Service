import { Layout as AntLayout } from "antd";
import { Link } from "react-router-dom";
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
          {user && (
            <>
              <li>
                <Link className="custom__link" to={"/records"}>
                  Админ панель
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className={css.header__btn}>
        <AddRecords />
        <Button className="custom__link" onClickHandler={onHandleLogout}>
          Выйти
        </Button>
      </div>
    </Header>
  );
};

export default CustomHeader;
