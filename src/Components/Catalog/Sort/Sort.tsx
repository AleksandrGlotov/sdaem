import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Arrow } from '../../../images//arrow.svg';
import { ReactComponent as SortArrow } from '../../../images//sort.svg';
import { ReactComponent as Block } from '../../../images/block.svg';
import { ReactComponent as List } from '../../../images/list.svg';
import { ReactComponent as Point } from '../../../images/Point.svg';
import { setFilter } from "../../../redux/catalogSlice";
import { selectFilters } from '../../../redux/selectors';
import { useAppDispatch } from '../../../redux/store';
import s from "./Sort.module.scss";

let cx = classNames.bind(s);

const list = [
    "По умолчанию",
    "По возрастанию цены",
    "По убыванию цены",
    "По возрастанию спальных мест",
    "По убыванию спальных мест",
    "По возрастанию комнат",
    "По убыванию комнат",
]

type PropsType = {
    isMapOpen: boolean
    setIsMapOpen: React.Dispatch<React.SetStateAction<boolean>>
    houseCardType: string
    setHouseCardType: React.Dispatch<React.SetStateAction<string>>
}

export const Sort = ({ isMapOpen, setIsMapOpen, houseCardType, setHouseCardType }: PropsType) => {

    const filters = useSelector(selectFilters)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const dispatch = useAppDispatch();

    const changeFilter = (item: string) => {
        dispatch(setFilter({
            ...filters,
            sort: item,
        }))
        setIsOpen(false)
    }

    const listSelect = list.map((item, index) => {
        return <li
            key={index}
            onClick={() => changeFilter(item)}
            className={filters.sort === item ? "active" : ""}>{item}</li>
    })

    useEffect(() => {
        if (isOpen === false) return;

        const handleClick = (e: any) => {
            if (!dropdownRef.current) return
            // @ts-ignore
            if (!dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [isOpen])

    useEffect(() => {
        if (localStorage.isRedirect === "true") {
            setIsMapOpen(true)
            delete localStorage.isRedirect
        }
    },[])

    return (
        <div className={s.sort_container}>
            <div className={s.dropdown_wrap}>
                <div ref={dropdownRef} className={s.dropdown}>
                    <div
                        className={isOpen ? "selectOpen" : ""}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <SortArrow />
                        {filters.sort}
                        <Arrow />
                    </div>

                    {isOpen && <ul>
                        {listSelect}
                    </ul>}
                </div>
            </div>
            <div className={s.housecard_type}>
                <div
                    onClick={() => setHouseCardType("list")}
                    className={cx(s.housecard_type_basic, { housecard_type_active: houseCardType === "list" })}
                >
                    <List />
                    <span>Список</span>
                </div>
                <div
                    onClick={() => setHouseCardType("block")}
                    className={cx(s.housecard_type_basic, { housecard_type_active: houseCardType === "block" })}
                >
                    <Block />
                    <span>Плитки</span>
                </div>
            </div>
            <div onClick={() => setIsMapOpen(!isMapOpen)} className={s.showMap}>
                <Point />
                <span >{isMapOpen ? "Закрыть карту" : "Показать на карте"}</span>
            </div>
        </div>
    )
}