import styles from "./page.module.css";
import { useState } from "react";

const [activePage, setActivePage] = useState(1);

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



const NavBar = ({pages, activePage, totalPages}) => {
    return(
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
  );
};

export default NavBar;
    

