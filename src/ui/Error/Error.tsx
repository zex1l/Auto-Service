import { FC } from "react";
import css from "./Erorr.module.scss";

interface ErorrProps {
  text: string;
}

const Error: FC<ErorrProps> = ({ text }) => {
  return <div className={css.erorr}>{text}</div>;
};

export default Error;
