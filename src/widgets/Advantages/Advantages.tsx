import css from "./Advantages.module.scss";
import cn from 'classnames'

import MinusSvg from '../../assets/svg/Minus.svg'
import PlusSvg from '../../assets/svg/Plus.svg'
import { FormEvent, useState } from "react";

const Advantages = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [currentOpenItem, setCurrentOpenItem] = useState('')

    const openDropDown = (event: FormEvent<HTMLImageElement>) => {
        const {id} = event.currentTarget
        setIsOpen(!isOpen)
        setCurrentOpenItem(id)
    }

  return (
    <div className={css.advantages}>
      <article className={cn(css.advantages__item, {[css.activeItem]:  isOpen && currentOpenItem === '1'})}>
        <header className={css.advantages__item_header}>
          <h2>01 Профессионализм</h2>
          <img src={isOpen && currentOpenItem === '1' ? MinusSvg  : PlusSvg} id="1" alt="Показать преимущества" onClick={openDropDown}/>
        </header>
        <div className={cn(css.advantages__item_body, {[css.activeBody]: isOpen && currentOpenItem === '1'})} >
            <hr/>
            <p>Наша команда состоит из сертифицированных специалистов с многолетним опытом.</p>
        </div>
      </article>
      <article className={cn(css.advantages__item, {[css.activeItem]: isOpen && currentOpenItem === '2'})}>
        <header className={css.advantages__item_header}>
          <h2>02 Прозрачность</h2>
          <img src={isOpen && currentOpenItem === '2' ? MinusSvg  : PlusSvg} id="2" alt="Показать преимущества" onClick={openDropDown}/>
        </header>
        <div className={cn(css.advantages__item_body, {[css.activeBody]: isOpen && currentOpenItem === '2'})} >
            <hr/>
            <p>Мы всегда согласуем стоимость работ и сроки выполнения с клиентом.</p>
        </div>
      </article>
      <article className={cn(css.advantages__item, {[css.activeItem]:isOpen && currentOpenItem === '3'})}>
        <header className={css.advantages__item_header}>
          <h2>03 Гарантия на услуги</h2>
          <img src={isOpen && currentOpenItem === '3' ? MinusSvg  : PlusSvg} id="3" alt="Показать преимущества" onClick={openDropDown}/>
        </header>
        <div className={cn(css.advantages__item_body, {[css.activeBody]: isOpen && currentOpenItem === '3'})} >
            <hr/>
            <p>Мы уверены в качестве нашей работы и предоставляем гарантию на все выполненные услуги.</p>
        </div>
      </article>
      <article className={cn(css.advantages__item, {[css.activeItem]: isOpen && currentOpenItem === '4'})}>
        <header className={css.advantages__item_header}>
          <h2>04 Удобное расположение</h2>
          <img src={isOpen && currentOpenItem === '4' ? MinusSvg  : PlusSvg} id="4" alt="Показать преимущества" onClick={openDropDown}/>
        </header>
        <div className={cn(css.advantages__item_body, {[css.activeBody]:isOpen && currentOpenItem === '4'})} >
            <hr/>
            <p>Наш сервис находится в центре города, что делает его доступным для всех.</p>
        </div>
      </article>
    </div>
  );
};

export default Advantages;
