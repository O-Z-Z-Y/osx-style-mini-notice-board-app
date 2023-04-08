import React from "react"
import AppModal from "../common/AppModal";


interface IProps {
  closeModal: () => void;
}

const TestApp: React.FC<IProps> = ({ closeModal }) => {

  return (
    <AppModal closeModal={closeModal}>
      <p>테스트</p>
    </AppModal>
  )
}

export default TestApp;