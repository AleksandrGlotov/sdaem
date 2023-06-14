import s from "./Categories.module.scss";

type PropsType = {
    checkedState: boolean[]
    handleOnChange: (a: any) => void; 
    index: number;
    item: {
        id: string;
        name: string;
    }
}

export const CheckBox = ({ item, index, handleOnChange, checkedState }: PropsType) => {
    return (
        <div className={s.checkbox_custom}>
            <input
                id={item.id}
                name={item.id}
                checked={checkedState[index]}
                onChange= {() => {handleOnChange(index)}}
                type="checkbox"
            />
            <label htmlFor={item.id}>{item.name}</label>
        </div>
    )
}