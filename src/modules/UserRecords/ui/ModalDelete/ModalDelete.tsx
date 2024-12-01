import { Button, Modal } from "antd";

export const ModalDelete = ({
  className,
  isModalOpen,
  onClose,
  handleSubmit,
}: Props) => {
  return (
    <Modal
      title="Отменить запись"
      open={isModalOpen}
      onClose={onClose}
      footer={
        <>
          <Button
            form="myForm"
            key="cancel"
            color="danger"
            variant="solid"
            onClick={handleSubmit}
          >
            Да, отменить запись
          </Button>
          <Button
            key="submit"
            htmlType="submit"
            color="primary"
            variant="solid"
            onClick={onClose}
          >
            Закрыть
          </Button>
        </>
      }
    >
      <p>Вы действительно хотите отменить запись</p>
    </Modal>
  );
};

type Props = {
  className?: string;
  isModalOpen: boolean;
  onClose: () => void;
  handleSubmit: () => void;
};
