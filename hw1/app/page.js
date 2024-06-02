'use client'; 
import styles from "./page.module.css";
import {useEffect, useState } from "react";
import axios from 'axios';
import NavBar from "./navigationBar";

const POSTS_PER_PAGE = 10;
const NOTES_URL = 'http://localhost:3001/notes'; 

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState(1);
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
        setPosts(response.data);
        setTotalPages(Math.ceil(response.headers['x-total-count']/POSTS_PER_PAGE))
    }).catch(error => { console.log("Encountered an error:" + error)});
  });

  const pages = Array.from({length: totalPages}, (_, i) => i+1);
  
  function goToFirstPage(){
    setActivePage(1);
  };

  const goToPrevPage = () => {
    setActivePage(prevPage => Math.max(prevPage - 1, 1));
  };

  function goToPage(index){
    setActivePage(index)
  };

  function goToNextPage(){
    setActivePage(nextPage => Math.min(nextPage + 1, totalPages))
  };

  function goToLastPage(){
    setActivePage(totalPages)
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {posts.map(post => (
          <div key={post.id} className={styles.post}>
            <div className={styles.postHeader}>
            <h1>{post.title}</h1>
            <p>Author: {post.author.name}</p>
            <p>Email: {post.author.email}</p>
            </div>
            <div className={styles.postContent}>
              <p>
                {post.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div>
      <button className={styles.button} name="first" onClick={goToFirstPage}>First</button>
        <button className={styles.button} name="previous" onClick={goToPrevPage}>Previous</button>
        {(totalPages <= 5 || activePage === 1 || activePage === 2) ? 
                pages.map(i => (i <= 5) ? ( 
              <button key={i}
              className={`${styles.button} ${activePage === i ? styles.boldButton : ''}`}
                name={'page' + '' + i}
                onClick={() => goToPage(i)}>
                  {i}
              </button>
              ): "") 
        : (activePage === totalPages-1 || activePage === totalPages) ? 
              [totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages].map(i => (
                <button key={i}
                className={`${styles.button} ${activePage === i ? styles.boldButton : ''}`}
                  name={'page' + '' + i}
                  onClick={() => goToPage(i)}>
                    {i}
                </button>
                ))  
        : [activePage-2,activePage-1,activePage,activePage+1,activePage+2].map(i => (
          <button key={i}
          className={`${styles.button} ${activePage === i ? styles.boldButton : ''}`}
            name={'page' + '' + i}
            onClick={() => goToPage(i)}>
              {i}
          </button>
          )) }
        
      <button className={styles.button} name="next" onClick={goToNextPage}>Next</button>
      <button className={styles.button} name="last" onClick={goToLastPage}>Last</button>
      </div>
    </main>
  );
}
