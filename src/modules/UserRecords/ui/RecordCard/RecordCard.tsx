import { Badge, Button, Card, Divider } from "antd";
import { IRecord } from "../../../RecordsModule/ui/RecordsList/RecordsList";
import css from "./RecordCard.module.scss";


const color = {
  Завершен: "green",
  Отказ: "red",
};

const RecordCard = ({ recordData, onOpenModal, disable }: Props) => {
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
          <span className={css.cardItem__description}>Тип обслуживания: </span>
          <span>{recordData.typeOfService}</span>
        </div>
        <Divider />
        <div>
          <span className={css.cardItem__description}>Стоимость: </span>
          <span>{recordData.cost}</span>
        </div>
      </Card>
      </Badge.Ribbon>
      <Button disabled={disable} onClick={() => onOpenModal(recordData)} className={css.card__button} color="danger" variant="outlined">Отменить</Button>
    </div>
  );
};

export default RecordCard;

type Props = {
  recordData: IRecord;
  onOpenModal: (record:IRecord) => void
  disable: boolean
};
