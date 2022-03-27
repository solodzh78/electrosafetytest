import React from "react";
import styles from "./Header.module.scss";

// interface IProps {
//     className?: string;
// }

export const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = function(props) {
    return <div className={styles.header + " " + props.className}>
        {props.children}
    </div>
};