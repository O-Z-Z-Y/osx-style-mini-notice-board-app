import React, { useState } from "react";
import styled from 'styled-components';
import BoardContent from "./BoardContent";

const Container = styled.div`
  width: 800px;
  height: 700px;
  background-color: #ddd;
  border-radius: 10px;
  z-index: 11;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

  .page-header {
    display: flex;
    justify-content: space-between;
    height: 35px;
    border-radius: 10px 10px 0 0;
    background-color: white;
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(231,231,231,1) 55%, rgba(198,198,198,1) 100%);

    .button-wrapper {
      padding-top: 3px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      > div {
        padding-right: 8px;
        cursor: not-allowed;
      }
      .close-button {
        cursor: pointer !important;
      }
      .green-button {
        cursor: help !important;
      }
    }

    .app-title {
      padding-top: 5px;
      margin-right: 45%;
    }
  }
`

interface IProps {
  closeModal: () => void;
}

const NoticeAppModal: React.FC<IProps> = ({ closeModal }) => {

  return (
    <Container>
      <div className="page-header">
        <div className="button-wrapper">
          <div className="close-button" onClick={closeModal}>
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="10" fill="#FF605C" />
            </svg>
          </div>
          <div className="yellow-button">
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="10" fill="#FFBD44" />
            </svg>
          </div>
          <div className="green-button">
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="10" fill="gray" />
            </svg>
          </div>
        </div>
        <div className="app-title">Notice App</div>
      </div>
      <BoardContent />
    </Container>
  )
}

export default NoticeAppModal;