import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Article from './Article';
import TopArticle from './TopArticle';
import { useSelector } from 'react-redux';
import { hidden } from '@/reducers/hiddenArticles';


export default function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value)

  const [topArticle, setTopArticle] = useState({}); // Un objet
  const [articlesData, setArticlesData] = useState([]); // Tableaux d'objets

  useEffect(() => {
    // On utilise le hook useEffect pour effectuer une requête au serveur au chargement de la page.
    fetch('https://my-news-back-one.vercel.app/articles') // On utilise la méthode fetch pour effectuer une requête GET au serveur.
      .then((response) => response.json()) // On utilise la méthode json() pour transformer la réponse en objet JavaScript.
      .then((data) => {
        // On récupère les données et on les stocke dans le state.
        setTopArticle(data.articles[0]); // On stocke le premier article dans le state topArticle.
        setArticlesData(data.articles.slice(1)); // On stocke les autres articles dans le state articlesData.
      });
  }, []);

  const filtererdData = articlesData.filter((el) => !hiddenArticles.includes(el.title))

  const articles = filtererdData.map((data, i) => {
    // On map sur le tableau articlesData pour créer un composant Article pour chaque article, et on lui passe les props.
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.title === data.title
    );
    return (
      <Article
        key={i}
        isBookmarked={isBookmarked} //booléen qui vient vérifier si l'article est présent ou pas dans bookmarks.
        {...data} // On passe toutes les props d'un coup avec l'opérateur spread (...)
      />
    );
  });

  let topArticles;
  if (bookmarks.some((bookmark) => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked />;
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />;
  }

  return (
    <>
      <Head>
        <title>My News - Accueil</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>{articles}</div>
    </>
  );
}
