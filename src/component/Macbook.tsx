import React from "react";
import styled from "styled-components";
import useModal from "../hooks/useModal";
import NoticeAppModal from "./notice-content/NoticeAppModal";
import MacbookHeader from "./MacbookHeader";
import FileButton from "./common/FileButton";
import { useSelector } from "../store";
import TestApp from "./test-app/TestApp";

const Container = styled.div`
  height: 100vh;
  background-image: url(./wallpaper.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 25%;
  overflow-x: hidden;
  font-family: 'San Francisco';
  user-select: none;
  
  .wallpaper-wrapper {
    position: absolute;
    height: 100vh;
    overflow-x: hidden;

    img {
      max-height: 100%;
      width: auto;
    }
  }
`;

const Macbook: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const selectedFile = useSelector((state) => state.file.selectedFile)

  //* 선택한 파일에 따른 모달셀렉터
  const currentModal = () => {
    switch (selectedFile) {
      case 'Notice App':
        return <NoticeAppModal closeModal={closeModal} />;
      case 'Test App':
        return <TestApp closeModal={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <MacbookHeader />
      <FileButton fileName="Notice App" fileIcon="./notice-icon.png" openModal={openModal} />
      <FileButton fileName="Test App" fileIcon="./test-icon.png" openModal={openModal} />
      <ModalPortal>
        {currentModal()}
      </ModalPortal>
    </Container>
  )
};
export default Macbook;