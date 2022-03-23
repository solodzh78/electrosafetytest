import React from "react";
import styles from "./Container.module.scss"

type Props = {
};

export const Container: React.FC<Props> = (props) => (
	<div className={styles.container}>
		{props.children}
	</div>
);