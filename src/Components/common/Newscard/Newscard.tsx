import React from "react";
import s from "./Newscard.module.scss";
import noPhoto from "../../../images/nophoto.png";
import { Link } from "react-router-dom";
import { NewsType } from "../../../redux/newsSlice";

type PropsType = {
  news: NewsType;
}

export const NewsCard = ({ news }: PropsType) => {
  return (
    <div className={s.newscard}>
      <img className={s.newscard_photo} src={news.photo || noPhoto} alt="" />
      <div className={s.newscard_caption}>
        <div className={s.newscard_text}>
          <h4>{news.title}</h4>
          <p>{news.description}</p>
        </div>
        <div className={s.newscard_bottom}>
          <p>{news.date}</p>
          <Link to={`/news/${news.id}`}>Читать</Link>
        </div>
      </div>
    </div>
  );
};
