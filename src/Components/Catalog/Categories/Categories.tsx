import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addresses, addSetups, beds, metros, rooms } from '../../../api/CategoriesList';
import { ReactComponent as Arrow } from '../../../images//arrow.svg';
import { ReactComponent as Setup } from '../../../images/setup.svg';
import { FiltersType, resetFilter, setFilter } from '../../../redux/catalogSlice';
import { useAppDispatch } from "../../../redux/store";
import { selectFilters } from './../../../redux/selectors';
import s from "./Categories.module.scss";
import { CheckBox } from './CheckBox';
import { Dropdown } from './Dropdown';

let cx = classNames.bind(s);

type PropsType = {
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export const Categories = ({ setIsChecked, setCurrentPage }: PropsType) => {

    const filters = useSelector(selectFilters)
    const dispatch = useAppDispatch();
    const [checkedState, setCheckedState] = useState(
        new Array(addSetups.length).fill(false)
    );
    const [localFilters, setLocalFilters] = useState<FiltersType>(filters)
    const [isOpenAddFilters, setIsOpenAddFilters] = useState<boolean>(false)

    const handleOnChange = (position: any) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    }

    const checkboxList = addSetups.map((item, index) => {
        return (
            <CheckBox
                key={item.id}
                checkedState={checkedState}
                handleOnChange={handleOnChange}
                index={index}
                item={item} />
        )
    })

    const changeFilter = (name: string, room: string) => {
        setLocalFilters(localFilters => ({
            ...localFilters,
            [name]: room,
        }));
    }

    const resetFilters = () => {
        setIsChecked(false)
        setCheckedState([
            ...new Array(addSetups.length).fill(false)
        ])
        dispatch(resetFilter())
        setCurrentPage(0)
    }

    const updateFilters = () => {
        dispatch(setFilter(localFilters));
        if (localFilters.room !== "Выберите" || localFilters.address !== "Выберите") {
            setIsChecked(true)
        }
        setCurrentPage(0)
    }

    useEffect(() => {
        setLocalFilters(filters)
    }, [filters])

    return (
        <>
            <div className={cx(s.categories_container, { isOpenAdd: isOpenAddFilters })}>
                <div className={s.categories}>
                    <div className={s.leftDrop}>
                        <Dropdown
                            label="Комнаты"
                            listName="room"
                            list={rooms}
                            filter={localFilters.room}
                            changeFilter={changeFilter}
                        />
                    </div>
                    <div className={s.sortPrice}>
                        <p>Цена за сутки</p>
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
                    <div
                        className={cx(s.addSetup, { isOpenAdd: isOpenAddFilters })}
                        onClick={() => setIsOpenAddFilters(!isOpenAddFilters)}
                    >
                        <span>Больше опций</span>
                        <Setup />
                    </div>
                    <div className={s.right_buttons}>
                        <div
                            className={s.clear}
                            onClick={resetFilters}
                        >
                            Очистить
                        </div>
                        <div
                            className={s.show}
                            onClick={updateFilters}>
                            <span>Показать объекты</span>
                            <Arrow />
                        </div>
                    </div>
                </div>
            </div>
            {isOpenAddFilters &&
                <div className={s.categories_container}>
                    <div className={s.addCategories}>
                        <div className={s.firstAdd}>
                            <Dropdown
                                label="Спальные места"
                                listName="bed"
                                list={beds}
                                filter={localFilters.bed}
                                changeFilter={changeFilter}
                            />
                            <Dropdown
                                label="Район"
                                listName="address"
                                list={addresses}
                                filter={localFilters.address}
                                changeFilter={changeFilter}
                            />
                            <Dropdown
                                label="Метро"
                                listName="metro"
                                list={metros}
                                filter={localFilters.metro}
                                changeFilter={changeFilter}
                            />
                        </div>
                        <div className={s.secondAdd}>
                            {checkboxList}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}