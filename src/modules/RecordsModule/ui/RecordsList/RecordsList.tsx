import { FC } from "react";
import RecordItem from "../RecordItem/RecordItem";
import { List } from "antd";
import { Link } from "react-router-dom";

export interface IRecord {
  id: string;
  name: string;
  contact: string;
  date: string;
  status: string;
  typeOfService: string;
  userId: string;
  cost: string
}

export interface RecordsListProps {
  records: IRecord[];
  openModal: (data: IRecord) => void
}

const RecordsList: FC<RecordsListProps> = ({ records, openModal }) => {
  return (
    <List
      grid={{
        gutter: 16,
        column: 4,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
      }}
      dataSource={records}
      renderItem={(item) => (
        <List.Item>
          <RecordItem openModal={openModal} recordData={item} key={item.id} />
        </List.Item>
      )}
    />
  );
};

export default RecordsList;
