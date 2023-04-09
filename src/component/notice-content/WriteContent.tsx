import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useState } from 'react';
import { firestore } from "../../service/firebase";
import { collection, addDoc } from "firebase/firestore";

const Container = styled.div`
  margin-top: 15px;
  width: 100%;
  font-size: 16px;

  label {
    font-size: large;
    font-weight: bold;
  }

  .post-title {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 10px;

      button {
        width: 80px;
        height: 40px;
        font-size: medium;
      }
    }

    input {
      height: 40px;
    }
  }
  .post-content {
    display: flex;
    flex-direction: column;
    
    label {
      margin-bottom: 10px;
    }

    textarea {
      height: 300px;
    }
  }

`
const WriteContent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();


  const onSubmitPost = async (e: any) => {
    e.preventDefault();
    try {
      console.log('제목 : ', title);
      console.log('내용 : ', text);
      console.log('작성일 : ', new Date());
      // TODO:여기 디스패치 넣어야함
      const docRef = await addDoc(collection(firestore, "contents"), {
        title: title,
        text: text,
        createAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      setText("");
    } catch (error) {
      console.error('Error message:', error);
    }
    
  }
  return (
    <Container>
      <form onSubmit={onSubmitPost}>
        <div className="post-title">
          <div className="post-header">
            <label htmlFor="title">제목</label>
            <button type="submit">작성</button>
          </div>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="post-content">
          <label htmlFor="content">내용</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </form>
    </Container>
  );
};

export default WriteContent;