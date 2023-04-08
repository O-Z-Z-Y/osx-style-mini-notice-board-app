import styled from 'styled-components';
import { ReactComponent as AppleLogoIcon } from './../assets/svg/apple.svg'
import { ReactComponent as BatteryIcon} from './../assets/svg/battery-charging.svg'
import { ReactComponent as SearchIcon} from './../assets/svg/search.svg'
import { ReactComponent as WifiIcon} from './../assets/svg/wifi-off.svg'
import CurrentTime from './macbook-content/CurrentTime';

const Container = styled.div`
  height: 25px;
  padding: 0 5px;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255,255,255,0.9);
  background-color: rgba(0,0,0,0.5);
  

  .nav-finder {
    font-weight: 600;
  }
  > div {
    padding: 0 5px;
    display: flex;
    > div {
      padding: 0 5px;
      cursor: default;
    }
  }
  
  .navbar-right {
    display: flex;
    align-items: center;a
    div {
      padding: 0 8px;
      svg {
        padding-top: 5px;
      }
    }
  }
`

const MacbookHeader: React.FC = () => {

  return (
    <Container>
      <div className="navbar-left">
        <div className="logo-wrapper">
          <AppleLogoIcon />
        </div>
        <div className="nav-finder">Finder</div>
        <div className="nav-file">File</div>
        <div className="nav-edit">Edit</div>
        <div className="nav-view">View</div>
        <div className="nav-go">Go</div>
        <div className="nav-window">Windows</div>
        <div className="nav-help">Help</div>
        <div className="noway">응 미구현</div>
      </div>
      <div className="navbar-right">
        <div className="macbook-battery">
          <BatteryIcon />
        </div>
        <div className="macbook-wifi">
          <WifiIcon />
        </div>
        <div className="macbook-search">
          <SearchIcon />
        </div>
        <CurrentTime />
      </div>
    </Container>
  )
}

export default MacbookHeader;