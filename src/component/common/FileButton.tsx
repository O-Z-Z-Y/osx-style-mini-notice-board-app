import React, { useRef } from "react"
import styled from "styled-components"
import { useSelector } from "../../store";
import { useDispatch } from "react-redux";
import { fileActions } from "../../store/file";

const Container = styled.div`
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
  
  .icon-wrapper {
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
    .icon-wrapper {
      border: 2px solid gray;
      background-color: rgba(40, 42, 58, 0.8);
    }
    p {
      background-color: rgba(0, 35, 91, 0.75);
    }
  }
  &:focus {
    cursor: pointer;
    .icon-wrapper {
      border: 2px solid gray;
      background-color: rgba(40, 42, 58, 0.8);
    }
    p {
      background-color: rgba(0, 35, 91, 0.75);
    }
  }
  
`

interface IProps {
  openModal: () => void;
  fileIcon: string;
  fileName: string;
}

const FileButton: React.FC<IProps> = ({ openModal,fileIcon,fileName }) => {
  const fileWrapper = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleClick = () => {
    fileWrapper.current?.focus();
    dispatch(fileActions.setSelectedFile(fileName))
  };

  return (
    <Container
    onDoubleClick={() => openModal()}
    ref={fileWrapper} 
    onClick={handleClick}
    tabIndex={0}
    >
      <div className="icon-wrapper">
        <img src={fileIcon} alt="" />
      </div>
      <p className="app-title">{fileName}</p>
    </Container>
  )
}

export default FileButton;