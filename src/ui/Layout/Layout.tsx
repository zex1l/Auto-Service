import { Layout as AntLayout } from "antd";
import Router from "../../routes/Router";
import CustomHeader from "../Header/CustomHeader";
import css from "./Layout.module.scss";
import Container from "../Container/Container";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import useAuth from "../../modules/AuthForm/useAuth";

const { Content } = AntLayout;

const Layout = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntLayout className={css.layout}>
      <Sider className={cn(css.sider, { [css.sider__open]: collapsed })}>
        <nav className={cn(css.nav, { [css.nav__open]: collapsed })}>
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
              <Link className="custom__link" to={"/services-goods"}>
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
      </Sider>
      <AntLayout className={css.layout}>
        <CustomHeader onOpenSider={() => setCollapsed(!collapsed)} />
        <Content className={css.content}>
          <Container>
            <Router />
          </Container>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
