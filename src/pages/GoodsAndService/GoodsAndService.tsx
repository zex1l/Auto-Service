import { useState } from "react";
import { Goods } from "../../modules/Goods/Goods";
import { Services } from "../../modules/Services/Services";
import css from "./GoodsAndService.module.scss";
import cn from 'classnames'

export const GoodsAndService = ({ className }: Props) => {
  const [typeInfo, setTypeInfo] = useState<"goods" | "services">("services");


  return (
    <section className={css.goodsAndService}>
        <div className={css.goodsAndService__type}>
          <div className={cn(css.goodsAndService__type_link, {[css["goodsAndService__type_link-active"]] : typeInfo === "services" })} onClick={() => setTypeInfo('services')}>
            Услуги
          </div>
          <div  className={cn(css.goodsAndService__type_link, {[css["goodsAndService__type_link-active"]] :  typeInfo === "goods"})} onClick={() => setTypeInfo('goods')}>
            Товары
          </div>
        </div>
      {typeInfo === "services" ? <Services /> : <Goods />}
    </section>
  );
};

type Props = {
  className?: string;
};
