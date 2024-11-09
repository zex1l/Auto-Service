import { useEffect, useState } from "react";
import RecordsList, { IRecord } from "./ui/RecordsList/RecordsList";
import Loader from "../../ui/Loader/Loader";
import { getRecordsData } from "./api/api";
import css from './RecordsModule.module.scss'

const RecordsModule = () => {
  const [recordsData, setRecordsData] = useState<IRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRecords = async () => {
    setIsLoading(true);
    const responce = await getRecordsData();
    setRecordsData(responce);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className={css.recordsModule}>
      <div className={css.recordsModule__count}>Количесвто записей: {recordsData.length}</div>
      
      {isLoading ? <Loader /> : <RecordsList records={recordsData} />}
    </div>
  );
};

export default RecordsModule;
