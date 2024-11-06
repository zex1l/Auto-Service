import css from './ServiceSIgn.module.scss'
import AddRecords from "../../modules/AddRecord/AddRecords";


const ServiceSign = () => {
    return (
        <div className={css.serviceSign}>
            <h2 className={css.serviceSign__title}>Хотите записаться в автосервис</h2>
            <p>Не откладывайте заботу о вашем автомобиле! Заполните форму ниже, и наш менеджер свяжется с вами для уточнения деталей. </p>
            <AddRecords/>
        </div>
    );
};

export default ServiceSign;