import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`

const WriteContent: React.FC = () => {
  return (
    <Container>
      <textarea></textarea>
    </Container>
  );
};

export default WriteContent;