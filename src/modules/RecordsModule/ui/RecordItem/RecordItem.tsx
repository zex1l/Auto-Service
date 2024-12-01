import { FC } from "react";
import { IRecord } from "../RecordsList/RecordsList";
import { Badge, Button, Card, Divider } from "antd";
import css from "./RecordItem.module.scss";

interface RecordItemProps {
  recordData: IRecord;
  openModal: (data: IRecord) => void;
}

const color = {
  Завершен: "green",
  Отказ: "red",
};

const RecordItem: FC<RecordItemProps> = ({ recordData, openModal }) => {
  return (
    <div className={css.card__wrapper}>
      <Badge.Ribbon
        text={recordData.status}
        color={
          recordData.status === "В процессе"
            ? "blue" //@ts-ignore
            : color[`${recordData.status}`]
        }
      >
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
            <span className={css.cardItem__description}>
              Тип обслуживания:{" "}
            </span>
            <span>{recordData.typeOfService}</span>
          </div>
          <Divider />
          <div>
            <span className={css.cardItem__description}>Стоимость: </span>
            <span>{recordData.cost}</span>
          </div>
        </Card>
      </Badge.Ribbon>
      <Button onClick={() => openModal(recordData)} className={css.card__button}>Редактировать</Button>
    </div>
  );
};

export default RecordItem;
