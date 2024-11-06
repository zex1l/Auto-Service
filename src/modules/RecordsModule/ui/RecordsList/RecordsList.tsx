import { FC } from "react";
import RecordItem from "../RecordItem/RecordItem";
import { Card, List } from "antd";
import { Link } from "react-router-dom";

export interface IRecord {
  id: string;
  name: string;
  contact: string;
  date: string;
  status: string;
  typeOfService: string;
}

export interface RecordsListProps {
  records: IRecord[];
}

const RecordsList: FC<RecordsListProps> = ({ records }) => {
  return (
    <List
      grid={{
        gutter: 16, column: 4,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3
      }}
      dataSource={records}
      renderItem={(item) => (
        <List.Item>
            <Link to={`/records/${item.id}`}>
            <RecordItem recordData={item} key={item.id}/>
            </Link>
            
        </List.Item>
      )}
    />
  );
};

export default RecordsList;
