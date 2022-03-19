import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
// import {
// 	decrement,
// 	increment,
// 	incrementByAmount,
// 	incrementAsync,
// 	incrementIfOdd,
// 	selectCount,
// } from './cardSlice';
import styles from "./Card.module.css";
import data from '../../cardData.json'
import { Answer } from "../answer/answer";

export function Card() {
    // const count = useAppSelector(selectCount);
    // const dispatch = useAppDispatch();
    // const [incrementAmount, setIncrementAmount] = useState('2');

    // const incrementValue = Number(incrementAmount) || 0;
	console.log(data);

    return (
        <div>
            <div className={styles.questions} id="questions-q1">
                <div className={styles.question} id="questionNum"></div>
                <div className={styles.question}>
                    <span id="question"></span>
                </div>
                <div className={styles.answers} id="answer1">
					{data.answers.map((item, index) => 
						<Answer
							text={item}
							name={"answer" + data.id}
							value={index + 1}
						/>)}
                </div>
                <div className={styles.div_button}>
                    <input
                        type="checkbox"
                        id="hint-q1"
                        className={styles.hintInput}//
                    />
                    <p className={styles.hint}>
                        <label className={styles.labelShow} htmlFor="hint-q1">
                            Показать пояснения
                        </label>
                        <label className={styles.labelHide} htmlFor="hint-q1">
                            Скрыть пояснения
                        </label>
                    </p>
                    <p className={styles.endTest}>Завершить тестирование</p>
                    <p className={styles.next}>Следующий вопрос</p>
                    <div className={styles.pravila}></div>
                </div>
            </div>
        </div>
    );
}
