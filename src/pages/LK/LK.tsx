import useAuth from "../../modules/AuthForm/useAuth";
import { UserRecords } from "../../modules/UserRecords/UserRecords";

export const LK = ({ className }: Props) => {

  return (
    <div>
        <h2>Личный кабинет</h2>
        <UserRecords/>
    </div>
  )
};

type Props = {
  className?: string;
};
