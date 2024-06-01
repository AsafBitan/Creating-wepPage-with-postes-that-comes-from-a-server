'use client'; 
import styles from "./page.module.css";
import {useEffect, useState } from "react";
import axios from 'axios';

const POSTS_PER_PAGE = 10;
const NOTES_URL = 'http://localhost:3001/notes'; 

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [activePage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
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
        setTotalPages(Math.ceil(response.headers['x-total-count']/POSTS_PER_PAGE))
    }).catch(error => { console.log("Encountered an error:" + error)});
  });

  const pages = Array.from({length: totalPages}, (_, i) => i+1);
  
  function goToFirstPage(){
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  function goToPage(index){
    setCurrentPage(index)
  };

  function goToNextPage(){
    setCurrentPage(nextPage => Math.min(nextPage + 1, totalPages))
  };

  function goToLastPage(){
    setCurrentPage(totalPages)
  };

  return (
    <main className={styles.main}>
      <div>

      </div>
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
      <button className={styles.button} name="first" onClick={goToFirstPage}>First</button>
      <button className={styles.button} name="previous" onClick={goToPrevPage}>Previous</button>
      {pages.map(i => (
        <button key={i} className={`${styles.button} ${activePage === i ? styles.boldButton : ''}`} onClick={() => goToPage(i)}>{i}</button>
      ))};
      {/* <button className={styles.button} name="page-1" onClick={goToPage}>1</button>
      <button className={styles.button} name="page-2" onClick={goToPage}>2</button>
      <button className={styles.button} name="page-3" onClick={goToPage}>3</button>
      <button className={styles.button} name="page-4" onClick={goToPage}>4</button>
      <button className={styles.button} name="page-5" onClick={goToPage}>5</button> */}
      <button className={styles.button} name="next" onClick={goToNextPage}>Next</button>
      <button className={styles.button} name="last" onClick={goToLastPage}>Last</button>
      </div>
    </main>
  );
}
