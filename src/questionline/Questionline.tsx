import React from "react";
import styles from './Questionline.module.scss'

export function Questionline() {

	return (
		<div className={styles["question-line"]}>
			{[...new Array(10)].map((item, index) => (
				<>
					<input type="radio" name="questions" id={"q" + (index + 1)} value={index + 1} />
					<label htmlFor={"q" + (index + 1)}>{index + 1}</label>
				</>
			))}
		</div>
	);
}