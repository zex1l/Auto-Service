import { Layout as AntLayout, Button } from "antd";
import { Link } from "react-router-dom";
const { Header } = AntLayout;
import css from "./CustomHeader.module.scss";
import useAuth from "../../modules/AuthForm/useAuth";

const CustomHeader = () => {
  const { user, onHandleLogout } = useAuth();

  return (
    <Header className={css.header}>
      <div>Logo</div>
      <nav className={css.header__navigate}>
        <ul className={css.header__link_list}>
          <li>
            <Link to={"/"}>О нас</Link>
          </li>
          <li>
            <Link to={"/"}>Связаться с нами</Link>
          </li>
          {user && (
            <li>
              <Button onClick={onHandleLogout}>Выйти</Button>
            </li>
          )}
        </ul>
      </nav>
    </Header>
  );
};

export default CustomHeader;
