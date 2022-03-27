import React from "react";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import styles from "./CheckButton.module.scss";

export const CheckButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => {
    const enable = useAppSelector(({ main: { quiz }}: RootState) => quiz.readyToCheck);
    return (
        <button 
            className={`${styles.btn} ${props.className}`} 
            onClick={props.onClick}
            disabled={!enable}
        >
            {props.children}
        </button>)};
