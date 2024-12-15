import ServiceImg_1 from "../../assets/image/service-1.png";
import ServiceImg_2 from "../../assets/image/service-2.png";
import ServiceImg_3 from "../../assets/image/service-3.png";
import ServiceImg_4 from "../../assets/image/service-4.png";
import ServiceImg_5 from "../../assets/image/service-5.png";
import ServiceImg_6 from "../../assets/image/service-6.png";
import { ServiceCard } from "./ui/ServiceCard/ServiceCard";
import css from "./Service.module.scss";

const mock: MockType[] = [
  {
    img: ServiceImg_1,
    textCard: [
      "Замена маслосъемных колпачков",
      "Ремонт ГБЦ",
      "Замена ремня/цепи ГРМ",
      "Замер компрессии двигателя",
      "Регулировка клапанов",
    ],
  },
  {
    img: ServiceImg_2,
    textCard: [
      "Диагностика систем впрыска ДВС бензин, дизель",
      "Диагностика систем торможения РВЅ, ЕЅР, ВАЅ, АЅК",
      "Диагностика подушек безопасности ЅКЅ",
      "Диагностика АКПП",
    ],
  },
  {
    img: ServiceImg_3,
    textCard: [
      "С/у стартера",
      "Замена втягиваюшего реле",
      "Замена щеточного узла",
      "Замена приводной шестерни (бендикса)",
      "Замена направляющих втулок",
      "Су генератора",
      "Замена подшипников",
      "Замена диодного моста",
      "Замена реле зарядки",
    ],
  },
  {
    img: ServiceImg_4,
    textCard: [
      "Балансировка",
      "Ремонт и покраска дисков",
      "Ремонт бескамерных шин",
      "Ремонт боковых порезов",
      "Ремонт боковых порезов",
    ],
  },
  {
    img: ServiceImg_5,
    textCard: [
      "Стенд 3D развал схождение позволяет выполнить регулировку углов установки колес наиболее качественно и быстро.",
    ],
  },
  {
    img: ServiceImg_6,
    textCard: [
      "Восстановление геометрии кузова",
      "Локальный ремонт кузова",
      "Ремонт бампера",
      "Полировка фар",
      "Замена автостекол",
    ],
  },
];

export const Services = ({ className }: Props) => {
  return (
    <>
      <h3 className={css.service__title}>
        Мы предоставляем самый широкий спектр работ по техническому обслуживанию
        автомобиля
      </h3>
      <div className={css.service}>
        {mock.map((item) => (
          <ServiceCard key={item.img} card={item} />
        ))}
      </div>
    </>
  );
};

type Props = {
  className?: string;
};

export type MockType = {
  img: string;
  textCard: string[];
};
