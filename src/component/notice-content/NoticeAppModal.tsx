import React from "react";
import BoardContent from "./BoardContent";
import AppModal from "../common/AppModal";


interface IProps {
  closeModal: () => void;
}

const NoticeAppModal: React.FC<IProps> = ({ closeModal }) => {

  return (
    <AppModal closeModal={closeModal}>
      <BoardContent />
    </AppModal>
  )
}

export default NoticeAppModal;