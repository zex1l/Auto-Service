import { useEffect, useState } from "react";
import { cancelRecord, getRecordsData } from "./api/api";
import useAuth from "../AuthForm/useAuth";
import { IRecord } from "../RecordsModule/ui/RecordsList/RecordsList";
import { List, message } from "antd";
import RecordCard from "./ui/RecordCard/RecordCard";
import useModal from "../../hooks/useModal";
import { ModalDelete } from "./ui/ModalDelete/ModalDelete";
import { onError, onSuccess } from "../../utils/noticeEvent";

export const UserRecords = ({ className }: Props) => {
  const [userRecords, setUserRecords] = useState<IRecord[] | undefined>([]);
  const [currentRecords, setCurrentRecords] = useState<IRecord | undefined>();
  const { closeModal, isModalOpen, openModal } = useModal();
  const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchRecords = async () => {
    const responce = await getRecordsData(user!);
    setUserRecords(responce);
  };

  const onDeleteRecordHandler = () => {
    currentRecords &&
    cancelRecord(currentRecords)
        .then((res) => {
          fetchRecords();
          onSuccess("Вы успешно отменили запись", messageApi);
        })
        .catch((err) => {
          onError("Что-то пошло не так", messageApi);
        });
    closeModal();
  };

  const onOpenModalHandler = (record: IRecord) => {
    openModal();
    setCurrentRecords(record);
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  return (
    <div>
      {contextHolder}
      <h3>Ваши записи</h3>
      <List
        grid={{
          gutter: 16,
          column: 4,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
        }}
        dataSource={userRecords}
        renderItem={(item) => (
          <List.Item>
            <RecordCard
              disable={item.status === "Отказ" ? true : false }
              recordData={item}
              onOpenModal={onOpenModalHandler}
              key={item.id}
            />
          </List.Item>
        )}
      />
      <ModalDelete
        handleSubmit={onDeleteRecordHandler}
        isModalOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

type Props = {
  className?: string;
};
