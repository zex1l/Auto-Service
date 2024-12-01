import { Layout as AntLayout } from "antd";
import Router from "../../routes/Router";
import CustomHeader from "../Header/CustomHeader";
import css from './Layout.module.scss'
import Container from "../Container/Container";

const { Content } = AntLayout;

const Layout = () => {
  return (
    <AntLayout className={css.layout}>
      <CustomHeader/>
      <Content className={css.content}>
          <Container>
            <Router/>
          </Container>
      </Content >
    </AntLayout>
  );
};

export default Layout;
