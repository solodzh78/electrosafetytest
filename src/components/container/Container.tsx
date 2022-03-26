import React from "react";
import styles from "./Container.module.scss"

interface IProps {
    className?: string;
}

export const Container: React.FC<IProps> = (props) => (
	<div className={styles.container + " " + props.className}>
		{props.children}
	</div>
);