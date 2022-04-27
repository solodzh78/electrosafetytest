import React from "react";
import styles from "./QuizHeader.module.scss";

// interface IProps {
//     className?: string;
// }

export const QuizHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = function(props) {
    return <div className={`${styles.header} ${props.className ? props.className : ''}`}>
        {props.children}
    </div>
};