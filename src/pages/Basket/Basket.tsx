import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Product, products } from '../../modules/Goods/Goods';
import { useEffect, useState } from 'react';
import ProductCard from '../../modules/Goods/ui/GoodsCard';
import css from './Basket.module.scss';
import {
  addCart,
  deleteCart,
  InitialStateType,
} from '../../redux/slices/cartSlice';
import { addBasketData, deleteBasketData } from '../../modules/Goods/api/api';
import useAuth from '../../modules/AuthForm/useAuth';

export const Basket = ({ className }: Props) => {
  const [basketData, setBasketData] = useState<Product[]>([]);
  const [dataMap, setDataMap] = useState<Map<string, number>>();
  const data = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const getResultCost = (data: InitialStateType) => {
    const result = data.goods.map((itemData) => {
      return products.filter((itemProduct) => itemProduct.id === itemData)[0];
    });

    let cost = 0;

    result.forEach((item) => (cost += item.price));
    return cost;
  };

  const filterData = () => {
    const uniqData = data.goods.filter(function (item, pos) {
      return data.goods.indexOf(item) == pos;
    });

    const result = uniqData.map((itemData) => {
      return products.filter((itemProduct) => itemProduct.id === itemData)[0];
    });

    setBasketData(result);

    const map = new Map();
    data.goods.forEach((item) => {
      if (!map.has(item)) {
        map.set(item, 1);
      } else map.set(item, map.get(item) + 1);
    });
    setDataMap(map);
  };

  const addToCart = async (id: string) => {
    await addBasketData(user!.uid, id);
    dispatch(addCart(id));
  };

  const deleteToCart = async (id: string) => {
    await deleteBasketData(user!.uid, id);
    dispatch(deleteCart(id));
  };

  useEffect(() => {
    if (data) filterData();
  }, [data]);

  return (
    <div className={css.basket}>
      <h2>Корзина</h2>
      <div className={css.basket__list}>
        {data &&
          dataMap &&
          basketData.map((item, index) => (
            <ProductCard
              addGood={() => addToCart(item.id)}
              deleteGood={() => deleteToCart(item.id)}
              count={dataMap.get(item.id)}
              key={index}
              {...item}
            />
          ))}
      </div>
      <div>
        <h3>Итоговая цена</h3>
        <div>{getResultCost(data)} ₽</div>
        <div>{}</div>
      </div>
    </div>
  );
};

type Props = {
  className?: string;
};
