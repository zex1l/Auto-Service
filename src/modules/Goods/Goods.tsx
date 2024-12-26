import ProductCard from './ui/GoodsCard';
import css from './Goods.module.scss';
import { useAppDispatch } from '../../redux/store';
import { addCart, deleteCart } from '../../redux/slices/cartSlice';
import { addBasketData, deleteBasketData } from './api/api';
import useAuth from '../AuthForm/useAuth';

export interface Product {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  id: string;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Замена масла',
    price: 2499,
    imageUrl:
      'https://klin-avtoservis.ru/client-media/CONTENT/BLOG/zamena-masla-v-dvigatele-est-sereznye-problemy-i-net-resheniya-video_1.jpeg',
    description:
      'Полная замена масла, включая замену фильтра и комплексную диагностику автомобиля.',
  },
  {
    id: '2',
    title: 'Замена тормозных колодок',
    price: 3999,
    imageUrl:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
    description:
      'Замена передних или задних тормозных колодок с проверкой тормозных дисков и всей системы.',
  },
  {
    id: '3',
    title: 'Развал-схождение',
    price: 2999,
    imageUrl:
      'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=800',
    description:
      'Профессиональная регулировка углов установки колёс для правильного износа шин.',
  },
  {
    id: '4',
    title: 'Обслуживание кондиционера',
    price: 4499,
    imageUrl:
      'https://rs-motors.ru/upload/iblock/862/862e5db3b2837f611928b42d606e4652.jpg',
    description:
      'Полная диагностика системы кондиционирования, заправка фреоном и проверка работоспособности.',
  },
];

export const Goods = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const addToCart = async (id: string) => {
    await addBasketData(user!.uid, id);
    dispatch(addCart(id));
  };

  const deleteToCart = async (id: string) => {
    await deleteBasketData(user!.uid, id);
    dispatch(deleteCart(id));
  };

  return (
    <div className={css.goods}>
      {products.map((product, index) => (
        <ProductCard
          onClick={user ? addToCart : null}
          key={index}
          addGood={() => addToCart(product.id)}
          deleteGood={() => deleteToCart(product.id)}
          {...product}
        />
      ))}
    </div>
  );
};

type Props = {
  className?: string;
};
