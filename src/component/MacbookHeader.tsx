import styled from 'styled-components';

const Container = styled.div`
  height: 25px;
  padding: 0 5px;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #151515;

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
  
`

const MacbookHeader: React.FC = () => {
  return (
    <Container>
      <div className="navbar-left">
        <div className="logo-wrapper">로고</div>
        <div className="nav-finder">Finder</div>
        <div className="nav-file">File</div>
        <div className="nav-edit">Edit</div>
        <div className="nav-view">View</div>
        <div className="nav-go">Go</div>
        <div className="nav-window">Windows</div>
        <div className="nav-help">Help</div>
      </div>
      <div className="navbar-right">
        <div className="macbook-wifi">wifi</div>
        <div className="macbook-remote">remote</div>
        <div className="macbook-battery">battery</div>
        <div className="macbook-time">time</div>
        <div className="macbook-search">search</div>
        <div className="macbook-siri">siri</div>
        <div className="macbook-sidebar">sidebar</div>
      </div>
    </Container>
  )
}

export default MacbookHeader;