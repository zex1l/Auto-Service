import { Button } from 'antd';
import css from './GoodsCard.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/store';

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  id: string;
  onClick?: ((id: string) => void) | null;
  className?: string;
  addGood?: () => void;
  deleteGood?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
  description,
  id,
  onClick,
  className,
  addGood,
  deleteGood,
}) => {
  const [countGood, setCountGood] = useState<number>(0);
  const data = useAppSelector((state) => state.cart);

  const getCountGoodBasket = () => {
    let result = 0;
    if (data) {
      data.goods.forEach((goodId) => (goodId === id ? (result += 1) : null));
    }

    setCountGood(result);
  };

  useEffect(() => {
    if (data) getCountGoodBasket();
  }, [data]);

  return (
    <div className={cn(css.goodCard, className)}>
      <div className={css.goodCard__wrapper}>
        <img src={imageUrl} alt={title} className={css.goodCard__img} />
      </div>
      <div className={css.goodCard__content}>
        <div>
          <h3 className={css.goodCard__content_title}>{title}</h3>
          <p className={css.goodCard__content_description}>{description}</p>
        </div>
        <div className={css.goodCard__footer}>
          <div className={css.goodCard__footer_buttons}>
            {typeof onClick === 'function' && !countGood && (
              <Button onClick={() => onClick(id)}>Купить</Button>
            )}

            {typeof addGood === 'function' &&
              typeof deleteGood === 'function' &&
              countGood !== 0 && (
                <div>
                  <Button onClick={addGood}>+</Button>
                  <Button onClick={deleteGood}>-</Button>
                </div>
              )}
          </div>
          <div className={css.goodCard__footer_price}>
            <span>{price} ₽</span>
          </div>
          {countGood && <div>{countGood}шт</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
