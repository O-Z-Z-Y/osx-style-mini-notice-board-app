
import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as CloseIcon } from './../../assets/svg/modal/close-icon.svg'
import { ReactComponent as MinimizeIcon } from './../../assets/svg/modal/minimize-icon.svg'
import { ReactComponent as MaximizeIcon } from './../../assets/svg/modal/maximize-icon.svg'

const Container = styled.div`
  padding-top: 3px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  > div {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    cursor: pointer;
    border-radius: 50%;
    text-align: center;
  }
  .close-button{
    background-color: #ff605C;
  }
  .minimize-button{
    background-color: #ffbd44;
  }
  .maximize-button{
    background-color: #00ca4e;
  }
  .icon-wrapper {
    margin-top:3px;
    color: rgba(0,0,0,0.5);
  }
`

interface IProps {
  closeModal: () => void;
  maximizeModal: () => void;
}

const SignalLightButton: React.FC<IProps> = ({ closeModal, maximizeModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container>
      <div className="close-button" 
      title="창 닫기" 
      onClick={closeModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="icon-wrapper">
        {isHovered && <CloseIcon />}
        </div>
      </div>
      <div
      className="minimize-button"
      title="최소화"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        <div className="icon-wrapper">
          {isHovered && <MinimizeIcon />}
        </div>
      </div>
      <div 
      className="maximize-button" 
      title="최대화" 
      onClick={maximizeModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        <div className="icon-wrapper">
          {isHovered && <MaximizeIcon />}
        </div>
      </div>
    </Container>
  )
}

export default SignalLightButton;