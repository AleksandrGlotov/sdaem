import React, { useEffect, useState } from "react";
import s from "./NewsListPage.module.scss";
import { NewsCard } from "../common/Newscard/Newscard";
import { getNewsAC, setFilteredNews } from "../../redux/newsSlice";
import { useSelector } from "react-redux";
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs";
import { useAppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import { selectFilteredNews } from '../../redux/selectors';
import ReactPaginate from "react-paginate";

const items = [
  {
    to: "/news",
    label: "Новости",
  },
];

export const NewsListpage = () => {

  const [search, setSearch] = useState('')

  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useAppDispatch();

  const news = useSelector(selectFilteredNews)

  const PER_PAGE = 6;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(news.length / PER_PAGE);

  const currentPageNews = news
    .slice(offset, offset + PER_PAGE)
    .map((n) => (
      <NewsCard key={n.id} news={n} />
    ));

  const handleFilterClick = () => {
    dispatch(setFilteredNews(search))
    setCurrentPage(0)
  }

  const handlePageClick = ({ selected: selectedPage }: any) => {
    setCurrentPage(selectedPage);
  }

  useEffect(() => {
    dispatch(getNewsAC())
  }, []);

  return (
    <section className={s.newspage}>
      <div className={s.newspage_container}>
        <Breadcrumbs>
          {items.map(({ to, label }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </Breadcrumbs>
        <div className={s.newspage_header}>
          <h1>Новости</h1>
          <div className={s.news_search}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Поиск по статьям"
            />
            <button onClick={handleFilterClick}></button>
          </div>
        </div>
        <div className={s.news_container}>
          {currentPageNews}
        </div>
        <ReactPaginate
          forcePage={currentPage}
          pageRangeDisplayed={6}
          marginPagesDisplayed={1}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          className={s.pagination}
          pageClassName={s.page}
          previousClassName={s.prev}
          nextClassName={s.next}
          disabledClassName={s.disabled}
          activeClassName={s.active}
        />
      </div>
    </section>
  );
};
