import styled from 'styled-components';
import { useState, useEffect } from 'react';
import WriteContent from './WriteContent';
import { firestore } from '../../service/firebase';
import { Timestamp, collection, onSnapshot, query } from 'firebase/firestore';

const Container = styled.div`
  margin:15px;
  max-height:650px;
  padding: 0 1rem;
  overflow: scroll;
  overflow-x: hidden;

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
    height: 100%;

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
interface ContentProps {
  id: string;
  title: string;
  createAt: string;
  text: string;
  userName: string;
}

const BoardContent: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [isWriting, setIsWriting] = useState(false);
  const [contents, setContents] = useState<ContentProps[]>([]);

  useEffect(() => {
    const getContents = async () => {
      const q = query(collection(firestore, "contents"))

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data: ContentProps[] = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          createAt: convertTimestamp(doc.data().createAt),
          text: doc.data().text,
          userName: doc.data().userName ?? "ㅇㅇ",
        }));
        setContents(data);
      });

      return () => {
        unsubscribe();
      };
    };
    getContents();
  }, [])

  const filterCategory = (category: string) => {
    setIsWriting(false);
    setFilter(category);
  };

  const convertTimestamp = (date: string | Timestamp) => {
    return date instanceof Timestamp
      ? date.toDate().toLocaleDateString()
      : date
  }

  return (
    <Container>
        <h2 className="notice-board-title">게시판</h2>
        <div className="button-wrapper">
          <div className="category-button">
            <button onClick={() => filterCategory('all')}>전체</button>
            <button onClick={() => filterCategory('notice')}>공지</button>
          </div>
          <div className="crud-button">
            {isWriting
              ? <button onClick={() => setIsWriting(false)}>목록</button>
              : <button onClick={() => setIsWriting(true)}>글쓰기</button>
            }
          </div>
        </div>
        {isWriting
          ? <WriteContent />
          : <div className="board-contents">
              {contents.map((content) => (
                <div className="content-wrapper" key={content.id}>
                  <div className="content-title-wrapper">
                    <h2 className="content-title">{content.title}</h2>
                    <p className="content-name-date">{content.userName} | {content.createAt}</p>
                  </div>
                  <p className="content-text">{content.text}</p>
                </div>
              ))}
            </div>

        }
    </Container>
  )
}

export default BoardContent;