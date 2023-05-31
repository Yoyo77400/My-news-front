import React from 'react';
import Image from 'next/image';
import styles from '../styles/TopArticle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmarks, removeBookmarks } from '@/reducers/bookmarks';

// Code du composant TopArticle qui représente l'article principal.

function TopArticle(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }
    fetch(`http://localhost:3001/users/canBookmark/${user.token}`)
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
    iconStyle = { color: '#E9BE59' };
  } else {
    iconStyle = { color: '#000000' };
  }

  return (
    <>
      <div className={styles.topContainer}>
        <Image
          src={props.urlToImage}
          alt={props.title}
          width={700}
          height={400}
        />
        <div className={styles.topText}>
          <h2>{props.title}</h2>
          <FontAwesomeIcon
            style={iconStyle}
            icon={faBookmark}
            className={styles.bookmarkIcon}
            onClick={() => handleBookmarkClick()}
          />
          <h4>{props.author}</h4>
          <p>{props.description}</p>
        </div>
      </div>
    </>
  );
}

export default TopArticle;
