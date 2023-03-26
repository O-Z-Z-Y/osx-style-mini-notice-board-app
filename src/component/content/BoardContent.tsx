import styled from 'styled-components';

const Container = styled.div`
  margin:15px;
  max-width: 1024px;
  padding: 0 1rem;

  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .content-wrapper {
    background-color: white;
    border-radius: 0.375rem;
    padding: 0 10px;
  }

  .content-title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content-text {
    padding-bottom: 15px;
  }
`

const contents = [
  {
    id:0,
    subject: "공지",
    username: "영자",
    date: "2023-03-18",
    text: "바른 말, 고운 말 써주세요 험한 말은 동의없이 삭제 될 수 있습니다.",
  },
  {
    id:1,
    subject: "게시글1",
    username: "ㅇㅇ",
    date: "2023-03-22",
    text: "1빠"
  }
]


const BoardContent: React.FC = () => {
  return (
    <Container>
        <h2 className="text-2xl font-bold mb-4">게시판</h2>
        {contents.map((content) => (
          <div className="content-wrapper" key={content.id}>
            <div className="p-4 m-4">
              <div className="content-title-wrapper">
                <h2 className="text-lg font-semibold mb-2">{content.subject}</h2>
                <p className="text-gray-500 text-sm mb-2">{content.username} | {content.date}</p>
              </div>
              <p className="content-text">{content.text}</p>
            </div>
          </div>
        ))}
    </Container>
  )
}

export default BoardContent;