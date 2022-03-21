import React from "react";
import { useTraceUpdate } from "../../hooks/useTraceUpdate";

interface IAnswer {
    text: string,
    name: string,
    value: number,
    checked: boolean,
    labelId: string,
}
export const Answer = (props: IAnswer) => {
    const { text, name, value, checked, labelId} = props;
    console.log("Рендер: ", labelId);
    useTraceUpdate(props);
    return (
        <> 
            <input
                type="radio"
                value={value}
                name={name}
                checked={checked}
                id={labelId}
                readOnly
            />
            <label htmlFor={labelId}>{text}</label>
        </>
    );
}
