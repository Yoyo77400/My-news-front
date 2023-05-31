import React, { useState } from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import { removeAllBookmarks } from '@/reducers/bookmarks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import { Modal } from 'antd';
import { removeHidden } from '@/reducers/hiddenArticles';

// Code du composant Header qui représente l'en-tête de l'application.

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const date = DateTime.now().toFormat('MMMM dd yyyy'); // On utilise la librairie Luxon pour afficher la date du jour.
  const [isModalVisible, setIsModalVisible] = useState(false); // On utilise le hook useState pour gérer l'état du modal. Par défaut, le modal n'est pas visible.
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signinUsername, setSigninUsername] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const handleSignup = () => {
    fetch('https://my-news-back-one.vercel.app/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signupUsername,
        password: signupPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, username: signupUsername }));
          setSignupUsername('');
          setSignupPassword('');
          setIsModalVisible(false);
        }
      });
  };
  const handleSignin = () => {
    fetch('https://my-news-back-one.vercel.app//users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signinUsername,
        password: signinPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, username: signinUsername }));
          setSigninUsername('');
          setSigninPassword('');
          setIsModalVisible(false);
        }
      });
  };

  const showModal = () => {
    // Cette fonction permet de changer l'état du modal. Si le modal est visible, on le cache et inversement.
    setIsModalVisible(!isModalVisible);
  };

  const handelLogout = () => {
    dispatch(logout());
    dispatch(removeAllBookmarks());
  };

  let userSection;
  if (user.token) {
    userSection = (
      <div>
        Welcome {user.username} /
        <span className={styles.logout} onClick={() => handelLogout()}>
          Logout
        </span>
      </div>
    );
  } else {
    if (isModalVisible) {
      // Si le modal est visible, on affiche l'icône de fermeture.
      userSection = (
        <FontAwesomeIcon
          onClick={() => showModal()}
          icon={faXmark}
          className={styles.userIcon}
        />
      );
    } else {
      // Sinon, on affiche l'icône de connexion.
      userSection = (
        <FontAwesomeIcon
          onClick={() => showModal()}
          icon={faUser}
          className={styles.userIcon}
        />
      );
    }
  }

  let modalContent;
  if (!user.token) {
    modalContent = // On définit le contenu du modal. Il s'agit de deux formulaires d'authentification (signup et signin).
      (
        <div className={styles.registerContainer}>
          <div className={styles.registerSection}>
            <p>Sign-up</p>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setSignupUsername(e.target.value)}
              value={signupUsername}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setSignupPassword(e.target.value)}
              value={signupPassword}
            />
            <button onClick={() => handleSignup()}>Register</button>
          </div>
          <div className={styles.registerSection}>
            <p>Sign-in</p>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setSigninUsername(e.target.value)}
              value={signinUsername}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setSigninPassword(e.target.value)}
              value={signinPassword}
            />
            <button onClick={() => handleSignin()}>Connect</button>
          </div>
        </div>
      );
  }

  return (
    // On affiche le header avec la date du jour, le titre de l'application, les liens vers les pages Articles et Bookmarks et le modal.
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div>{date}</div>
        <Link href="/">
          <h1 className={styles.title}>My News</h1>
        </Link>
        <FontAwesomeIcon
          onClick={() => dispatch(removeHidden())}
          icon={faEye}
          className={styles.eyeIcon}
        />
        {userSection}
      </div>
      <div className={styles.linkContainer}>
        <Link href="/" className={styles.link}>
          Articles
        </Link>
        <Link href="/bookmarks" className={styles.link}>
          Bookmarks
        </Link>
      </div>
      {isModalVisible && ( // On affiche le modal si l'état du modal est vrai (if isModalVisible === true => show modal else => hide modal).
        // On utilise la librairie Ant Design pour afficher le modal (https://4x.ant.design/components/modal/).
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            visible={isModalVisible}
            closable={false}
            footer={null}
          >
            {modalContent}
          </Modal>
        </div>
      )}
    </header>
  );
}

export default Header;
