import { useCallback, useState } from "react";

const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = useCallback(() => {
        setIsModalOpen(true);
      }, []);
    
      const closeModal = useCallback(() => {
        setIsModalOpen(false);
      }, []);
    return {isModalOpen, closeModal, openModal}
};

export default useModal;