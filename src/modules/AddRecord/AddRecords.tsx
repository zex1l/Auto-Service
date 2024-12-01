import {
  Button as AntButton,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import useModal from "../../hooks/useModal";
import { FormEvent, useState } from "react";
import css from "./AddRecords.module.scss";
import { addNewRecord } from "./api/api";
import Button from "../../ui/Button/Button";
import useAuth from "../AuthForm/useAuth";
import { useNavigate } from "react-router-dom";
import { IRecord } from "../RecordsModule/ui/RecordsList/RecordsList";
import { onError, onSuccess } from "../../utils/noticeEvent";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddRecords = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onOpenModalHandler = () => (!user ? navigate("/login") : openModal());

  const onChageData = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSelectData = (value: string) => {
    setData((prevState) => ({
      ...prevState,
      typeOfService: value,
    }));
  };

  const onChageDate: DatePickerProps["onChange"] = (date, dateString) => {
    setData((prevState) => ({
      ...prevState,
      date: dateString,
    }));
  };

  const onSubmitData = async () => {
    const responce = await addNewRecord({
      ...data,
      userId: user!.uid,
      cost: "В процессе подсчета",
      status: "В процессе",
    } as IRecord);
    if (responce.status === 200) {
      closeModal();
      onSuccess("Вы успешно записались.", messageApi);
    } else {
      closeModal();
      onError("Произошла ошибка, повторите еще раз.", messageApi);
    }
    setData({});
  };

  return (
    <>
      {contextHolder}
      <Button onClickHandler={onOpenModalHandler} className="custom__link">
        Записаться в Автосервис
      </Button>
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
        key="modal_add"
        footer={[
          <>
            <AntButton
              form="myForm"
              key="submit"
              htmlType="submit"
              color="primary"
              variant="solid"
            >
              Записаться
            </AntButton>
            <AntButton
              key="cancel"
              color="danger"
              variant="solid"
              onClick={closeModal}
            >
              Отменить
            </AntButton>
          </>,
        ]}
      >
        <Form
          name="control-hooks"
          style={{ maxWidth: 600 }}
          {...layout}
          id="myForm"
          onFinish={onSubmitData}
          clearOnDestroy
        >
          <Form.Item
            className={css.form__item}
            name="name"
            label="Имя"
            key="name"
            rules={[
              { required: true, message: "Поле обязательно к заполнению" },
            ]}
          >
            <Input key="name" name="name" onChange={onChageData} />
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
            <Input
              key="contact"
              name="contact"
              onChange={onChageData}
              type="tel"
            />
          </Form.Item>
          <Form.Item
            className={css.form__item}
            name="data"
            label="Выберите дату"
            key="data"
            rules={[
              { required: true, message: "Поле обязательно к заполнению" },
            ]}
          >
            <DatePicker onChange={onChageDate} placeholder="Выберите дату" />
          </Form.Item>
          <Form.Item
            className={css.form__item}
            name="typeOfService"
            label="Тип обслуживания"
            key="typeOfService"
            rules={[
              { required: true, message: "Поле обязательно к заполнению" },
            ]}
          >
            <Select
              placeholder="Выберите тип обслуживания"
              onChange={onSelectData}
              allowClear
              key="typeOfService"
            >
              <Option value="ТО">Техническое обсуживание</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddRecords;
