import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Card from "./Card";
import { NEWS_API_KEY } from "../keys";
import Navbar from "../component/Navbar";
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 5);

const formatDate = (date) => date.toISOString().split("T")[0];
async function getData(query) {

  const res = await fetch(
    `https://api.apilayer.com/world_news/search-news?text=${query}&earliest-publish-date=${formatDate(yesterday)}&language=en&apikey=${NEWS_API_KEY}`
  );
 console.log(res);
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

  if (loading) return (
    <div>
      <Navbar />
      <div className={styles.loading}>Loading...</div>
    </div>
  );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Navbar />
      <div className={styles.home_page_container}>
        <div className={styles.news_cards}>
          {data?.news?.map((curElem, index) => (
            <Card key={`${curElem.url}-${index}`} {...curElem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
