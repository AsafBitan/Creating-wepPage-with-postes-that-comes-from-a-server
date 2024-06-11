"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./navigationBar";

const POSTS_PER_PAGE = 10;
const NOTES_URL = "http://localhost:3001/notes";
// How the post will look.
const Post = ({ post }) => (
  <div className={styles.post}>
    <div className={styles.postHeader}>
      <h1>{post.title}</h1>
      <p>Author: {post.author.name}</p>
      <p>Email: {post.author.email}</p>
    </div>
    <div className={styles.postContent}>
      <p>{post.content}</p>
    </div>
  </div>
);

export default function Home() {
  const [posts, setPosts] = useState([]); // Setting the posts that are going to show.
  const [activePage, setActivePage] = useState(1); // Setting the active page we are going to be on.
  const [totalPages, setTotalPages] = useState(1); // Setting the total pages we will have.

  // Connencting to the server and getting the relevant information.
  useEffect(() => {
    const promise = axios.get(NOTES_URL, {
      params: {
        _page: activePage,
        _per_page: POSTS_PER_PAGE,
      },
    });
    promise
      .then((response) => {
        if (!response.data) {
          throw new Error("No data found");
        }
        setPosts(response.data);
        setTotalPages(
          Math.ceil(response.headers["x-total-count"] / POSTS_PER_PAGE) // The total pages will be the number of total posts we have devided by the number of posts per page
        );
      })
      .catch((error) => {
        console.log("Encountered an error:" + error);
      });
  }, [activePage, POSTS_PER_PAGE]); // Adding dependency array so it won't rerender every render cycle

  const currentFivePages = (totalPages, activePage) => {
    // Deciding what buttons to other pages to show depending on the total pages and the active page
    if (activePage <= 2 || totalPages <= 5) {
      return Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);
    } else if (activePage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        activePage - 2,
        activePage - 1,
        activePage,
        activePage + 1,
        activePage + 2,
      ];
    }
  };

  const pages = currentFivePages(totalPages, activePage);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      {/* NavBar will handle all the navigation and its layout */}
      <NavBar
        pages={pages}
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </main>
  );
}
