import { useRef, useEffect, useState} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div<{ mounted: boolean }>`
  width: 100%;
  height: calc(100% - 25px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25px;
  left: 0;
  z-index: 11;
`;

const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  interface IProps {
    children: React.ReactNode;
  }

  const ModalPortal: React.FC<IProps> = ({ children }) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.querySelector("#root-modal");
        ref.current = dom;
      }
    }, []);
    
    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container mounted={mounted}>
          {children}
        </Container>,
        ref.current
      );
    }
    return null;
  };

  return {
    openModal,
    closeModal,
    ModalPortal,
  };
};

export default useModal;