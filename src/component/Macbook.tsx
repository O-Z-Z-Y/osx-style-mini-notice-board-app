import React from "react";
import styled from "styled-components";
import { useRef } from 'react';
import useModal from "../hooks/useModal";
import NoticeAppModal from "./content/NoticeAppModal";
import MacbookHeader from "./MacbookHeader";

const Container = styled.div`
  height: 100vh;
  background-image: url(./wallpaper.jpg);
  background-size: auto 100vh;
  background-repeat: no-repeat;
  background-position: center center;
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

  .notice-app-wrapper {
    width: 100px;
    height: 130px;
    position: relative;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    color: white;
    
    .notice-icon-wrapper {
      width: 95px;
      height: 95px;
      margin-bottom: 5px;
      text-align: center;
      border: 2px solid rgba(0,0,0,0);
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      margin: 0 5px;
      padding: 0 5px 5px 5px;
      border-radius: 5px;
      text-align: center;
    }
    &:hover {
      cursor: pointer;
      .notice-icon-wrapper {
        border: 2px solid gray;
        background-color: rgba(40, 42, 58, 0.8);
      }
      p {
        background-color: rgba(0, 35, 91, 0.75);
      }
    }
    &:focus {
      cursor: pointer;
      .notice-icon-wrapper {
        border: 2px solid gray;
        background-color: rgba(40, 42, 58, 0.8);
      }
      p {
        background-color: rgba(0, 35, 91, 0.75);
      }
    }
  }
`;



const Macbook: React.FC = () => {
  const fileWrapper = useRef<HTMLDivElement>(null);
  const { openModal, closeModal, ModalPortal } = useModal();

  const handleClick = () => {
    fileWrapper.current?.focus();
  };

  return (
    <Container>
      <MacbookHeader />
      <div
        className="notice-app-wrapper" 
        onDoubleClick={() => openModal()}
        ref={fileWrapper} 
        onClick={handleClick}
        tabIndex={0}>
        <div className="notice-icon-wrapper">
          <img src="./notice-icon.png" alt="" />
        </div>
        <p className="notice-app-name">Notice App</p>
      </div>
      <ModalPortal>
        <NoticeAppModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  )
};
export default Macbook; 