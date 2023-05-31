import React from 'react';
import Image from 'next/image';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmarks, removeBookmarks } from '@/reducers/bookmarks';
import { hidden } from '@/reducers/hiddenArticles';


// Code du composant Article qui représente un article de presse.

function Article(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const hiddenArticle = useSelector((state)=> state.hiddenArticles.value);
  const handleBookmarkClick = () => {
    if (!user.token) {
      // si l'utilisateur n'est pas connecté, on ne fait rien et on sort de la fonction
      return;
    }
    fetch(`https://my-news-back-one.vercel.app/users/canBookmark/${user.token}`) // on vérifie si l'utilisateur peut ajouter un article en favoris
      .then((res) => res.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmarks(props));
          } else {
            dispatch(addBookmarks(props));
          }
        }
      });
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    // si isBookmarked est true cela veut dire que l'article est présent dans bookmarks
    // donc l'icone sera jaune
    iconStyle = { color: '#E9BE59' };
  } else {
    //sinon elle sera noir
    iconStyle = { color: '#000000' };
  }

  // const handleHidden = () => {
  //   dispatch(hidden(props.title));
  //   console.log(hiddenArticle)
  // }


  return (
    <>
      <div className={styles.articleContainer}>
        <div className={styles.articleHeader}>
          <h3>{props.title}</h3>
          {!props.isBookmarked &&           <FontAwesomeIcon
          icon={faEyeSlash}
          className={styles.eyeIcon}
          onClick={()=> dispatch(hidden(props.title))}
        />}
          <FontAwesomeIcon
            icon={faBookmark}
            style={iconStyle}
            className={styles.bookmarkIcon}
            onClick={() => handleBookmarkClick()}
          />
        </div>
        <h4 style={{ textAlign: 'right' }}>{props.author}</h4>
        <div className={styles.divider}></div>
        <Image
          src={props.urlToImage}
          alt="une image"
          width={400}
          height={225}
        />
        <p>{props.description}</p>
      </div>
    </>
  );
}

export default Article;
