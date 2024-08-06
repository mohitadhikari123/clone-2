import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Card from "./Card";
import { NEWS_API_KEY } from "../keys";
import Navbar from "../component/Navbar";

async function getData(query) {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=popularity&apiKey=${NEWS_API_KEY}`
  );
  return res.json();
}

const News = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inputValue = window.localStorage.getItem("Input");
        const result = await getData(inputValue);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Navbar />
      <div className={styles.home_page_container}>
        <div className={styles.news_cards}>
          {data?.articles?.map((curElem) => (
            <Card key={curElem.url} {...curElem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
