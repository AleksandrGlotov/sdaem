import s from "./MoreNews.module.scss"
import { useSelector } from 'react-redux';
import { selectNews } from './../../../redux/selectors';
import { NewsCard } from './../../common/Newscard/Newscard';

type PropsType = {
    currentNewsID: number
}

export const MoreNews = ({currentNewsID}: PropsType) => {

    const newsList = useSelector(selectNews)
    const lastEl = newsList.length - 1;

    function rnd(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const nextNews = [
        newsList.find(n => n.id === currentNewsID + 1) || newsList[rnd(0, lastEl)],
        newsList.find(n => n.id === currentNewsID + 2) || newsList[rnd(0, lastEl)],
        newsList.find(n => n.id === currentNewsID + 3) || newsList[rnd(0, lastEl)],
    ]

    const currentPageNews = nextNews
        .map((n) => (
            <NewsCard key={n?.id} news={n} />
        ));

    return (
        <div className={s.moreNews_container}>
            <div className={s.moreNews}>
                <h2>Читайте также</h2>
                <div className={s.randomNews}>
                    {currentPageNews}
                </div>
            </div>
        </div>
    )
}
