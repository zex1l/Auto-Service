import { Layout as AntLayout, Badge } from 'antd';
import { Link, useParams } from 'react-router-dom';
const { Header } = AntLayout;
import css from './CustomHeader.module.scss';
import useAuth from '../../modules/AuthForm/useAuth';
import AddRecords from '../../modules/AddRecord/AddRecords';
import LogoImg from '../../assets/image/7941439.jpg';
import Button from '../Button/Button';
import BurgerIcon from '../../assets/svg/burger.svg';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { BasketType, getBasketData } from '../../modules/Goods/api/api';
import { updateCart } from '../../redux/slices/cartSlice';

type Props = {
  onOpenSider: () => void;
};

const CustomHeader = ({ onOpenSider }: Props) => {
  const { user, onHandleLogout } = useAuth();
  const { count } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const getUserBasket = async () => {
    const data: BasketType[] = (await getBasketData(user!.uid)) as BasketType[];
    console.log(user!.uid);
    data &&
      dispatch(
        updateCart({ count: data[0].goods.length, goods: data[0].goods })
      );
  };

  useEffect(() => {
    if (user?.uid!) getUserBasket();
  }, [user]);

  return (
    <Header className={css.header}>
      <div onClick={onOpenSider}>
        <img className={css.header__burger} src={BurgerIcon} alt="" />
      </div>
      <Link to={'/'}>
        <img src={LogoImg} width={80} height={80} alt="" />
      </Link>
      <div className={css.header__btn}>
        {user && (
          <Link to="/basket" className={css.header__shopingCart}>
            <Badge
              count={count}
              children={
                <ShoppingCartOutlined style={{ fontSize: 30, color: '#fff' }} />
              }
            ></Badge>
          </Link>
        )}
        <AddRecords />
        {user && (
          <Button className="custom__link" onClickHandler={onHandleLogout}>
            Выйти
          </Button>
        )}
        {!user ? <RenderButton /> : null}
      </div>
    </Header>
  );
};

const RenderButton = () => {
  const path = location.pathname;
  if (path === '/login') return null;
  return (
    <Link to={'/login'}>
      <Button className="custom__link">Войти</Button>
    </Link>
  );
};

export default CustomHeader;
