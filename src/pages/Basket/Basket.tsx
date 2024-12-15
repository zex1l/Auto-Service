import { useAppSelector } from "../../redux/store";
import { Product, products } from "../../modules/Goods/Goods";
import { useEffect, useState } from "react";

export const Basket = ({ className }: Props) => {
  const [basketData, setBasketData] = useState<Product[]>([])
    const data = useAppSelector(state => state.cart)


  const getResultCost = () => {
    let cost = 0

    basketData.forEach(item => cost += item.price)
    return cost
  }

  const filterData = () => {
    const result = data.goods.map(itemData => {
       return products.filter(itemProduct => itemProduct.id === itemData)[0]
    })

    setBasketData(result)
  }

  useEffect(() => {
    if(data) filterData()
  }, [data])

  return <div>
    <h2>Корзина</h2>
    <div>
      {data && basketData.map((item, index) => (
        <div key={index}>
            <div>{item.title}</div>
            <div>{item.price} ₽</div>
        </div>
      ))}
      <div>
        <h3>Итоговая цена</h3>
        <div>{getResultCost()} ₽</div>
      </div>
    </div>
  </div>;
};

type Props = {
  className?: string;
};
