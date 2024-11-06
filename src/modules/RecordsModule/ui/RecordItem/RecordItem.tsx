import { FC } from "react";
import { IRecord } from "../RecordsList/RecordsList";
import { Badge, Card, Divider } from "antd";
import css from './RecordItem.module.scss'

interface RecordItemProps {
    recordData: IRecord
}

const color = {
    Завершен: 'green',
    Отказ: 'red'
}

const RecordItem:FC<RecordItemProps> = ({recordData}) => {

    return (
        <Badge.Ribbon text={recordData.status} color={recordData.status === 'В процессе' ? 'blue' : color[`${recordData.status}`]}>
            <Card title={recordData.name}>
                <div>
                    <span className={css.cardItem__description}>Номер для связи: </span>
                    <span>{recordData.contact}</span>
                </div>
                <Divider />
                <div>
                    <span className={css.cardItem__description}>Дата посещения: </span>
                    <span>{recordData.date}</span>
                </div>
                <Divider />
                <div>
                    <span className={css.cardItem__description}>Тип обслуживания: </span>
                    <span>{recordData.typeOfService}</span>
                </div>
            </Card>
        </Badge.Ribbon>
            
    );
};

export default RecordItem;