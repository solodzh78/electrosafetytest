import React, { useState } from "react";

import styles from "./Answer.module.css";

export function Answer(text: string, name: string, value: number) {
    // const count = useAppSelector(selectCount);

    return (
        <label className={styles.answer}>
            <input type="radio" value={value} name={name}/>
            {text}
        </label>
    )
}
