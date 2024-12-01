import { Modal, Form, Input, Select, Button } from "antd";
import layout from "antd/es/layout";
import css from "./EditModal.module.scss";
import { IRecord } from "../RecordsList/RecordsList";
import { FormEvent, useEffect, useState } from "react";
import { getDataById} from "../../api/api";
import { DocumentData } from "firebase/firestore";

export const EditModal = ({ closeModal, isModalOpen, recordId, onSubmitData }: Props) => {
  const [form] = Form.useForm();
  const [dataEdit, setDataEdit] = useState<IRecord>({
    contact: "",
    cost: "",
    date: "",
    id: "",
    name: "",
    status: "",
    typeOfService: "",
    userId: "",
  });

  useEffect(() => {
    if (recordId && recordId !== "")
      getDataById(recordId).then((res: DocumentData | null) => {
    
        setDataEdit(res as IRecord);
        form.setFieldsValue(res);
      });
  }, [isModalOpen]);

  const onChangeData = (e: FormEvent<HTMLInputElement>) => {
    if (dataEdit)
      setDataEdit({
        ...dataEdit,
        [e.currentTarget.name]: e.currentTarget.value,
      });
  };

  const onSelectData = (value: string) => {
    setDataEdit((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}>
          <p>Запись в автосервис</p>
        </div>
      }
      open={isModalOpen}
      onCancel={closeModal}
      okText="Записаться"
      cancelText="Отменить"
      destroyOnClose
      footer={[
        <>
          <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            color="primary"
            variant="solid"
          >
            Редактировать
          </Button>
          <Button
            key="cancel"
            color="danger"
            variant="solid"
            onClick={closeModal}
          >
            Отменить
          </Button>
        </>,
      ]}
    >
      <Form
        form={form}
        name="control-hooks"
        style={{ maxWidth: 600 }}
        id="myForm"
        onFinish={() => onSubmitData(dataEdit)}
        clearOnDestroy
      >
        <Form.Item
          className={css.form__item}
          name="name"
          label="Имя"
          rules={[{ required: true, message: "Поле обязательно к заполнению" }]}
          key="name"
        >
          <Input disabled name="name" value={dataEdit?.name} />
        </Form.Item>
        <Form.Item
          className={css.form__item}
          name="contact"
          label="Контактный телефон"
          key="contact"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите номер телефона!",
            },
            {
              pattern: /^\+?[1-9]\d{1,14}$/,
              message: "Неверный формат номера телефона!",
            },
          ]}
        >
          <Input disabled name="contact" type="tel" />
        </Form.Item>
        <Form.Item
          className={css.form__item}
          name="typeOfService"
          label="Тип обслуживания"
          key="typeOfService"
          rules={[{ required: true, message: "Поле обязательно к заполнению" }]}
        >
          <Select
            placeholder="Выберите тип обслуживания"
            disabled
            allowClear
            value={dataEdit?.typeOfService}
          >
            <Select.Option value="ТО">Техническое обсуживание</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          className={css.form__item}
          name="cost"
          label="Укажите цену"
          key="cost"
          rules={[{ required: true, message: "Поле обязательно к заполнению" }]}
        >
          <Input
            placeholder="Укажите цену за услугу"
            name="cost"
            value={dataEdit?.cost}
            onChange={onChangeData}
          />
        </Form.Item>
        <Form.Item
          className={css.form__item}
          name="status"
          label="Выберете статус"
          key="status"
          rules={[{ required: true, message: "Поле обязательно к заполнению" }]}
        >
          <Select
            placeholder="Выберете статус"
            allowClear
            value={dataEdit?.status}
            onSelect={onSelectData}
            
          >
            <Select.Option value="В процессе">В процессе</Select.Option>
            <Select.Option value="Завершен">Завершен</Select.Option>
            <Select.Option value="Отказ">Отказ</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

type Props = {
  className?: string;
  closeModal: () => void;
  isModalOpen: boolean;
  recordId: string;
  onSubmitData: (data: IRecord) => void
};

