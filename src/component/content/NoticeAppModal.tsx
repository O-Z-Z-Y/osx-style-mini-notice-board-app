import React, { useState } from "react";
import styled, { css } from 'styled-components';
import BoardContent from "./BoardContent";
import throttle from 'lodash/throttle';
import { useRef } from 'react';

interface StyleProps {
  isMaximized?: boolean;
  positionX: number;
  positionY: number;
}

const Container = styled.div<StyleProps>`
  position: relative;
  width: ${props => props.isMaximized ? '100%' : '800px'};
  height: ${props => props.isMaximized ? 'calc(100vh - 25px)' : '700px'};
  background-color: #ddd;
  border-radius: 10px;
  z-index: 11;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

  ${props =>
    !props.isMaximized &&
    css`
      transform: translateX(${props.positionX}px) translateY(${props.positionY}px);
    `
  }


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
        cursor: pointer !important
      }
    }

    .app-title {
      padding-top: 5px;
      margin-right: 45%;
      user-select: none;
    }
  }
`

interface IProps {
  closeModal: () => void;
}

const NoticeAppModal: React.FC<IProps> = ({ closeModal }) => {
  const [isMaximized, setIsMaximized] = useState(false)
  const appRef = useRef<HTMLDivElement>(null);


  const maximizeModal = () => {
    setIsMaximized(!isMaximized)
  }

  //* 드래그 앤 드롭 만들기
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };

  const modalPositionHandler = (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    const mouseMoveHandler = throttle((moveEvent: MouseEvent) => {
      const deltaX = moveEvent.screenX - clickEvent.screenX;
      const deltaY = moveEvent.screenY - clickEvent.screenY;

      const browser = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      const app = appRef.current?.getBoundingClientRect()

      setPosition({
        x: inrange(
          x + deltaX,
          Math.floor((-browser.width + app!.width) / 2),
          Math.floor((browser.width - app!.width) / 2),
        ),
        y: inrange(
          y + deltaY,
          Math.floor((-browser.height + app!.height + 25) / 2),
          Math.floor((browser.height - app!.height - 25) / 2),
        )
      });
    }, 16); // 60fps

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }
  
  return (
    <Container isMaximized={isMaximized} positionX={x} positionY={y} ref={appRef}>
      <div className="page-header" onMouseDown={modalPositionHandler} onDoubleClick={maximizeModal}>
        <div className="button-wrapper">
          <div className="close-button" title="창 닫기" onClick={closeModal}>
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="10" fill="#FF605C" />
            </svg>
          </div>
          <div className="yellow-button" title="최소화">
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="10" fill="#FFBD44" />
            </svg>
          </div>
          <div className="green-button" title="최대화" onClick={maximizeModal}>
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="10" fill="#00CA4E" />
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