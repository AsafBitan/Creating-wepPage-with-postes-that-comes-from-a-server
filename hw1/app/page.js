'use client';
import styles from "./page.module.css";
import {useEffect, useState } from "react";
import axios from 'axios';

const POSTS_PER_PAGE = 10;
const NOTES_URL = 'http://localhost:3001/notes'; 
const activePage = 1;

export default function Home() {
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    const promise = axios.get(NOTES_URL, {
        params: {
          _page: activePage,
          _per_page: POSTS_PER_PAGE
        }});
    promise.then(response => { 
        if (!response.data){
          throw new Error('No data found');
        }
        setNotes(response.data);
    }).catch(error => { console.log("Encountered an error:" + error)});
  });

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {notes.map(note => (
          <div key={note.id} className={styles.noteContainer}>
            <div className={styles.noteHeader}>
            <h1>{note.title}</h1>
            <p>Author: {note.author.name}</p>
            <p>Email: {note.author.email}</p>
            </div>
            <div className={styles.noteContent}>
              <p>
                {note.content}
              </p>
            </div>
          </div>
        ))}
   
      </div>
      <div>
      <button name="first">First</button>
      <button name="previous">Previous</button>
      <button name="page-1">1</button>
      <button name="page-2">2</button>
      <button name="page-3">3</button>
      <button name="page-4">4</button>
      <button name="page-5">5</button>
      <button name="next">Next</button>
      <button name="last">Last</button>
      </div>
    </main>
  );
}
