import { About } from "./About/About"
import { Advantages } from "./Advantages/Advantages"
import { BigLink } from "./BigLink/BigLink"
import s from "./Main.module.scss"
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import { getCatalogAC, resetFilter } from '../../redux/catalogSlice';
import { useSelector } from 'react-redux';
import { selectCatalog } from "../../redux/selectors";
import { ShowMap } from "./ShowMap/ShowMap";
import { LinksToCatalog } from "./LinksToCatalog/LinksToCatalog";
import { Carousel } from "./Carousel/Carousel";
import { MainSearch } from "./MainSearch/MainSearch";

export const Main = () => {

    const houses = useSelector(selectCatalog)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCatalogAC());
        dispatch(resetFilter())
    }, []);

    return (
        <div className={s.main_container}>
            <MainSearch/>
            <LinksToCatalog />
            <Carousel houses={houses}/>
            <BigLink count={houses.length} />
            <ShowMap
                title={"Поиск квартир на карте"}
                text={"Ищите квартиры на сутки в центре города, возле парка или в живописном районе"}
                button_text={"Открыть карту"}
            />
            <Advantages />
            <About />
        </div>
    )
} 