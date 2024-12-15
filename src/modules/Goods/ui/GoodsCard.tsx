import { Button } from 'antd';
import css from './GoodsCard.module.scss'

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  id: string
  onClick: ((id:string) =>  void) | null
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
  description,
  id,
  onClick
}) => {
  return (
    <div className={css.goodCard}>
      <div className={css.goodCard__wrapper}>
        <img
          src={imageUrl}
          alt={title}
          className={css.goodCard__img}
        />
      </div>
      <div className={css.goodCard__content}>
        <h3 className={css.goodCard__content_title}>
            {title}
        </h3>
        <p className={css.goodCard__content_description}>{description}</p>
        <div className={css.goodCard__footer}>
          <div className={css.goodCard__footer_buttons}>
            {typeof onClick === "function" && <Button onClick={ () => onClick(id)}>Купить</Button>}
          </div>
          <div className={css.goodCard__footer_price}>
            <span>{price} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;