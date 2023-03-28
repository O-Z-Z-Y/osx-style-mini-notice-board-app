import styled from 'styled-components';
import { useState } from 'react';

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

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid #aaa;

    button {
      width: 80px;
      height: 40px;
      font-size: medium;
    }
  }

  .board-contents {
    margin-top: 15px;

    .content-wrapper {
      background-color: white;
      border-radius: 0.375rem;
      margin-top: 15px;
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
  }
`

interface Content {
  id: number;
  subject: string;
  username: string;
  date: string;
  text: string;
  category?: string | 'all';
}

const contents: Content[] = [
  {
    id:0,
    subject: "공지",
    username: "영자",
    date: "2023-03-18",
    text: "바른 말, 고운 말 써주세요 험한 말은 동의없이 삭제 될 수 있습니다.",
    category: "notice"
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
  const [filter, setFilter] = useState('all');

  const filterCategory = (category: string) => {
    setFilter(category);
  };

  const filteredContents = filter === 'all' ? contents : contents.filter((content) => content.category === filter);


  return (
    <Container>
        <h2 className="notice-board-title">게시판</h2>
        <div className="button-wrapper">
          <div className="category-button">
            <button onClick={() => filterCategory('all')}>전체</button>
            <button onClick={() => filterCategory('notice')}>공지</button>
          </div>
          <div className="crud-button">
            <button>글쓰기</button>
          </div>
        </div>
        <div className="board-contents">
          {filteredContents.map((content) => (
            <div className="content-wrapper" key={content.id}>
              <div className="content-title-wrapper">
                <h2 className="content-subject">{content.subject}</h2>
                <p className="content-name-date">{content.username} | {content.date}</p>
              </div>
              <p className="content-text">{content.text}</p>
            </div>
          ))}
        </div>
    </Container>
  )
}

export default BoardContent;