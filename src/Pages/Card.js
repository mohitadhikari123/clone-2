import styles from "./page.module.css";

export default function Card({
  id,
  image,
  title,
  url,
  urlToImage,
  publishedAt,
  description,
  source,
}) {
  return urlToImage ? (
    <div className={styles.card_container}>
      <a href={url}>
        <div className={styles.card_image}>
          {urlToImage && (
            <img src={urlToImage} width={486} height={243} alt="" />
          )}
        </div>
        <div className={styles.news_text_container}>
          <div className={styles.title}>
            <span>{title}</span>
          </div>
          <div className={styles.desc}>{description}</div>
          <div className={styles.channel_publish}>
            <div className={styles.channel}>Channel : {source?.name}</div>
            <div className={styles.publish}>Publish Date : {publishedAt}</div>
          </div>
        </div>
      </a>
    </div>
  ) : null;
}
