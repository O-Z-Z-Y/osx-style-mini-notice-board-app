import React from "react"
import AppModal from "../common/AppModal";
import { firestore } from '../../service/firebase';
import { useState, useEffect } from 'react';
import { Timestamp, collection, onSnapshot, query } from "firebase/firestore";

interface IProps {
  closeModal: () => void;
}

interface Doc {
  id: string;
  title: string;
  createAt: Timestamp;
  content: string;
}

const TestApp: React.FC<IProps> = ({ closeModal }) => {
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    const getContents = async () => {
      const q = query(collection(firestore, "contents"))

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          createAt: doc.data().createAt,
          content: doc.data().content,
          ...doc.data() }));
        setDocs(data);
      });

      return () => {
        unsubscribe();
      };
    };
    getContents();
  }, [])

  return (
    <AppModal closeModal={closeModal}>
      {docs.map((content) => (
        <div className="contents-wrapper">
          <div className="title">{content.title}</div>
          <div className="date">
            {content.createAt instanceof Timestamp
              ? content.createAt.toDate().toLocaleDateString()
              : content.createAt}
          </div>
          <div className="content">{content.content}</div>
        </div>
      ))}
    </AppModal>
  )
}

export default TestApp;