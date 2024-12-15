import { useEffect, useState } from "react";
import RecordsList, { IRecord } from "./ui/RecordsList/RecordsList";
import Loader from "../../ui/Loader/Loader";
import { getRecordsData, updateRecordById } from "./api/api";
import css from "./RecordsModule.module.scss";
import useModal from "../../hooks/useModal";
import { EditModal } from "./ui/EditModal/EditModal";
import { message } from "antd";
import { onSuccess } from "../../utils/noticeEvent";

const RecordsModule = () => {
  const [recordsData, setRecordsData] = useState<IRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<string>("");
  const { closeModal, isModalOpen, openModal } = useModal();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchRecords = async () => {
    setIsLoading(true);
    const responce = await getRecordsData();
    setRecordsData(responce);
    setIsLoading(false);
  };
  console.log(recordsData)
  const onOpenModalHandler = (data: IRecord) => {
    setCurrentRecord(data.id);
    openModal();
  };

  const onSubmitData =  async(dataEdit: IRecord) => {
    await updateRecordById(dataEdit)
    closeModal();
    onSuccess('Успешно обновлено', messageApi)
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [isModalOpen]);

  return (
    <div className={css.recordsModule}>
      {contextHolder}
      <div className={css.recordsModule__count}>
        Количесвто записей: {recordsData.length}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <RecordsList openModal={onOpenModalHandler} records={recordsData} />
      )}
      {currentRecord && (
        <EditModal
          recordId={currentRecord}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          onSubmitData={onSubmitData}
        />
      )}
    </div>
  );
};

export default RecordsModule;
