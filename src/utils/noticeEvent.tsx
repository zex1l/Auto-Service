import { MessageInstance } from "antd/es/message/interface";

export const onSuccess = (text:string, messageApi: MessageInstance) => {
  messageApi.open({
    type: "success",
    content: text,
  });
};

export const onError = (text:string, messageApi: MessageInstance) => {
  messageApi.open({
    type: "error",
    content: text,
  });
};
