import css from './Home.module.scss'

import PreviewPhoto from '../../assets/image/service-preview.png'
import Slider from '../../widgets/Slider/Slider';

const Home = () => {
  return (
    <>
        <h1>Автомастерская "АвтоСервис"</h1>
        <div className={css.home__widget}>
            <img src={PreviewPhoto} alt="Фото сервиса превью" />
            <p>Ремонт и профилактика
            автомобиля</p>
        </div>
        <Slider/>
    </>   
  );
};

export default Home;
