import React, { useState } from "react";
import styled, { css } from 'styled-components';
import throttle from 'lodash/throttle';
import { useRef } from 'react';
import SignalLightButton from "../macbook-content/SignalLightButton";
import { useSelector } from "../../store";

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

    .app-title {
      padding-top: 5px;
      margin-right: 45%;
      user-select: none;
    }
  }
`

interface IProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const AppModal: React.FC<IProps> = ({ closeModal, children }) => {
  const [isMaximized, setIsMaximized] = useState(false)
  const appRef = useRef<HTMLDivElement>(null);
  const selectedFile = useSelector((state) => state.file.selectedFile)

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
        <SignalLightButton closeModal={closeModal} maximizeModal={maximizeModal}/>
        <div className="app-title">{selectedFile}</div>
      </div>
      {children}
    </Container>
  )
}

export default AppModal;