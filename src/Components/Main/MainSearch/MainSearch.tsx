import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FiltersType, setFilter } from "../../../redux/catalogSlice"
import { selectFilters } from "../../../redux/selectors"
import { useAppDispatch } from "../../../redux/store"
import { addresses, beds, metros, rooms, towns } from "../../../api/CategoriesList"
import { Dropdown } from "../../Catalog/Categories/Dropdown"
import s from "./MainSearch.module.scss"
import { ReactComponent as Setup } from '../../../images/setup.svg';
import { ReactComponent as Arrow } from '../../../images//arrow.svg';
import { ReactComponent as Point } from '../../../images//Point.svg'
import classNames from 'classnames/bind';
import { useNavigate } from "react-router-dom"

let cx = classNames.bind(s);

export const MainSearch = () => {

    const navigate = useNavigate()
    const filters = useSelector(selectFilters)
    const dispatch = useAppDispatch();
    const [localFilters, setLocalFilters] = useState<FiltersType>(filters)
    const [isOpenAddFilters, setIsOpenAddFilters] = useState<boolean>(false)
    const townsName = towns.map((t) => t.name)
    const path = towns.find(town => town.name === localFilters.town)?.to || "catalog/Minsk"

    const handleClick = () => {
        localStorage.setItem('isRedirect', "true");
        dispatch(setFilter(localFilters));
        navigate(path)
    }

    const changeFilter = (name: string, room: string) => {
        setLocalFilters(localFilters => ({
            ...localFilters,
            [name]: room,
        }));
    }

    const updateFilters = () => {
        dispatch(setFilter(localFilters));
        navigate(path)
    }

    useEffect(() => {
        setLocalFilters(filters)
    }, [filters])

    return (
        <main className={s.main_container}>
            <h1>Sdaem.by - у нас живут <b>ваши объявления</b></h1>
            <div>
                <div className={cx(s.search, { isOpenAdd: isOpenAddFilters })}>
                    <div className={s.labeltop}>
                        <Dropdown
                            label="Город"
                            listName="town"
                            list={townsName}
                            filter={localFilters.town}
                            changeFilter={changeFilter}
                        />
                    </div>
                    <div className={s.border}></div>
                    <div className={s.labeltop}>
                        <Dropdown
                            label="Комнаты"
                            listName="room"
                            list={rooms}
                            filter={localFilters.room}
                            changeFilter={changeFilter}
                        />
                    </div>
                    <div className={s.border}></div>
                    <div className={s.sortPrice}>
                        <p>Цена за сутки (BYN)</p>
                        <div>
                            <input
                                type="number"
                                placeholder='От'
                                onChange={e => (changeFilter("from", e.target.value))}
                                value={localFilters.from}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                placeholder='До'
                                onChange={e => (changeFilter("to", e.target.value))}
                                value={localFilters.to}
                            />
                        </div>
                    </div>
                    <div className={s.border}></div>
                    <div
                        className={cx(s.addSetup, { isOpenAdd: isOpenAddFilters })}
                        onClick={() => setIsOpenAddFilters(!isOpenAddFilters)}
                    >
                        <span>Больше опций</span>
                        <Setup />
                    </div>
                    <div className={s.border}></div>
                    <div className={s.right_buttons}>
                        <div className={s.link_button} onClick={handleClick}>
                            На карте
                            <Point />
                        </div>
                        <div
                            className={s.show}
                            onClick={updateFilters}>
                            <span>Показать</span>
                            <Arrow />
                        </div>
                    </div>
                </div>
                {isOpenAddFilters &&
                    <div className={s.search}>
                        <div className={s.addCategories}>
                            <div className={s.firstAdd}>
                                <Dropdown
                                    label="Спальные места"
                                    listName="bed"
                                    list={beds}
                                    filter={localFilters.bed}
                                    changeFilter={changeFilter}
                                />
                                <div className={s.border}></div>
                                <Dropdown
                                    label="Район"
                                    listName="address"
                                    list={addresses}
                                    filter={localFilters.address}
                                    changeFilter={changeFilter}
                                />
                                <div className={s.border}></div>
                                <Dropdown
                                    label="Метро"
                                    listName="metro"
                                    list={metros}
                                    filter={localFilters.metro}
                                    changeFilter={changeFilter}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </main>
    )
}