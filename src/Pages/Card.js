import styles from "./page.module.css";

export default function Card({
  id,
  image,
  title,
  url,
  publish_date,
  summary = "",
  author = "",
}) {
  const finalSummary =
    summary.substring(0, 130) + (summary.length > 130 ? "..." : "");

  return image && summary && title? (
    <div className={styles.card_container}>
      <a href={url}>
        <div className={styles.card_image}>
          {image && (
            <img
              src={image}
              width={486}
              height={243}
              alt={title || "News Image"}
            />
          )}
        </div>
        <div className={styles.news_text_container}>
          <div className={styles.title}>
            <span>{title}</span>
          </div>
          <div className={styles.desc}>{finalSummary}</div>
          <div className={styles.channel_publish}>
            <div className={styles.channel}>Authors: {author || "Unknown"}</div>
            <div className={styles.publish}>Publish Date: {publish_date || "Unknown"}
            </div>
          </div>
        </div>
      </a>
    </div>
  ) : null;
}
