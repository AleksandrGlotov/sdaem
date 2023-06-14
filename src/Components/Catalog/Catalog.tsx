import classNames from 'classnames/bind';
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { towns } from "../../api/CategoriesList";
import { ReactComponent as Fb } from "../../images/fb.svg";
import { ReactComponent as Tg } from "../../images/telegram.svg";
import { ReactComponent as Vi } from "../../images/viber.svg";
import { ReactComponent as Vk } from "../../images/vk.svg";
import { ReactComponent as Wa } from "../../images/watsapp.svg";
import { getCatalogAC } from "../../redux/catalogSlice";
import { selectFilteredCatalog } from '../../redux/selectors';
import { useAppDispatch } from "../../redux/store";
import { Breadcrumbs } from "../common/Breadcrumbs/Breadcrumbs";
import { HouseCard } from "../common/HouseCard/HouseCard";
import { ShowMap } from "../Main/ShowMap/ShowMap";
import s from "./Catalog.module.scss";
import { Categories } from "./Categories/Categories";
import { CheckCategories } from "./CheckCategories/CheckCategories";
import { Sort } from "./Sort/Sort";

let cx = classNames.bind(s);

export const Catalog = () => {

    const location = useLocation()
    let label = towns.find(town => town.to === location.pathname)?.label

    const [currentPage, setCurrentPage] = useState(0)
    const [isMapOpen, setIsMapOpen] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [houseCardType, setHouseCardType] = useState("block")


    const houses = useSelector(selectFilteredCatalog)
    const dispatch = useAppDispatch();

    const PER_PAGE = 6;
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(houses.length / PER_PAGE);

    const currentPageHouses = houses
        .slice(offset, offset + PER_PAGE)
        .map((house) => (
            <HouseCard key={house.id} housecard={house} houseCardType={houseCardType}/>
        ));

    const handlePageClick = ({ selected: selectedPage }: any) => {
        setCurrentPage(selectedPage);
    }

    const sklonenie = (number: number, txt: string[], cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    const resultSklonenie = sklonenie(houses.length, ["результат", "результата", "результатов"])


    useEffect(() => {
        dispatch(getCatalogAC());
    }, []);

    return (
        <section className={s.catalog}>
            <div className={s.breadcrumps_container}>
                <div className={s.catalog_breadcrumps}>
                    <Breadcrumbs>
                        <Link key={location.pathname} to={location.pathname}>
                            {label}
                        </Link>
                    </Breadcrumbs>
                    <h2>Аренда {label}</h2>
                    <p>Рекомендуем посмотреть</p>
                    <CheckCategories
                        setCurrentPage={setCurrentPage}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                    />
                </div>
            </div>
            <Categories
                setCurrentPage={setCurrentPage}
                setIsChecked={setIsChecked}
            />
            <Sort
                isMapOpen={isMapOpen}
                setIsMapOpen={setIsMapOpen}
                houseCardType={houseCardType}
                setHouseCardType={setHouseCardType}
            />
            <div className={cx({ map_active: isMapOpen, map_disabled: !isMapOpen })}>
                <YMaps >
                    <Map width={1280} height={700} className={s.mapYandex} defaultState={{ center: [53.896, 27.554], zoom: 11 }}>
                        <Placemark geometry={[53.896, 27.554]} />
                    </Map>
                </YMaps>
            </div>
            <div className={cx({ catalog_disabled: isMapOpen, catalog_container: !isMapOpen })}>
                <h3>Найдено {houses.length} {resultSklonenie}</h3>
                <div className={s.houses_container}>
                    {currentPageHouses}
                </div>
                <div className={s.pagination_container}>
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
                    <div className={s.social}>
                        <span>Поделиться</span>
                        <a className={s.logo_bg} href="#">
                            <Vk className={s.vk} />
                        </a>
                        <a className={s.logo_bg} href="#">
                            <Fb className={s.fb} />
                        </a>
                        <a className={s.logo_bg} href="#">
                            <Wa className={s.small} />
                        </a>
                        <a className={s.logo_bg} href="#">
                            <Tg className={s.small} />
                        </a>
                        <a className={s.logo_bg} href="#">
                            <Vi className={s.small} />
                        </a>
                    </div>
                </div>
            </div>
            {!isMapOpen && <ShowMap
                title={"Показать найденные квартиры на карте"}
                text={"Ищите новостройки рядом с работой, парком или родственниками"}
                button_text={"Открыть карту"}
                setIsMapOpen={setIsMapOpen}
            />
            }
        </section>
    )
}