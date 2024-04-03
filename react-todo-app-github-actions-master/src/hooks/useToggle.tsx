import { useState } from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onOpen = (event: any) => {
    if (event.target.id === "editTask") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, onOpen, onClose, isEdit };
};

export default useToggle;
