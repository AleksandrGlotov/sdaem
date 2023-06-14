import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { addresses, rooms } from "../../../api/CategoriesList";
import { ReactComponent as Close } from "../../../images/close.svg";
import { resetFilter, setFilter } from "../../../redux/catalogSlice";
import { selectFilters } from '../../../redux/selectors';
import { useAppDispatch } from "../../../redux/store";
import s from "../Catalog.module.scss";

let cx = classNames.bind(s);

type PropsType = {
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export const CheckCategories = ({ isChecked, setIsChecked, setCurrentPage }: PropsType) => {

    const dispatch = useAppDispatch();
    const filters = useSelector(selectFilters)

    const onChangeAddressChecked = (filter: string) => {
        setIsChecked(true)
        dispatch(setFilter({
            ...filters,
            address: filter,
        }))
    }

    const onChangeRoomChecked = (filter: string) => {
        setIsChecked(true)
        dispatch(setFilter({
            ...filters,
            room: filter,
        }))
        setCurrentPage(0)
    }

    const resetFilters = () => {
        setIsChecked(false)
        dispatch(resetFilter())
    }

    const roomsList = rooms.map((f, index) => {
        return (
            <div
                className={cx(s.filter,
                    {
                        filter_active: (filters.room === f) && (isChecked),
                        filter_disabled: (filters.room !== f) && (isChecked)
                    })}
                key={index}
            >
                <span onClick={() => onChangeRoomChecked(f)}>{f.slice(0, -1)}атные</span>
                <Close onClick={resetFilters} />
            </div>
        )
    })

    const addressesList = addresses.map((f, index) => {
        return (
            <div
                className={cx(s.filter,
                    {
                        filter_active: (filters.address === f) && (isChecked),
                        filter_disabled: (filters.address !== f) && (isChecked)
                    })}
                key={index}
            >
                <span onClick={() => onChangeAddressChecked(f)}>{f}</span>
                <Close onClick={resetFilters} />
            </div>
        )
    })

    return (
        <div className={s.filtersList}>
            {roomsList}
            {addressesList}
        </div>
    )
}