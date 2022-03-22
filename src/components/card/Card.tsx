import React, { useCallback } from "react";
import { useAppDispatch, useGetValueFromStore } from "../../store/hooks";
import { setSelectedAnswer } from "../../store/quizSlice";
import Answer from "../answer/Answer";
import styles from "./Card.module.css";

interface ICardProps {
    cardNumber: number
}

export function Card(props: ICardProps) {
    const {cardNumber} = props;
    const dispatch = useAppDispatch();

    const question = useGetValueFromStore("question", cardNumber); 
    let answers = useGetValueFromStore("answers", cardNumber);
    const id = useGetValueFromStore("id", cardNumber);

    const handleOptionChange = useCallback(() => ((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedAnswer({
            cardNumber,
            "selectedAnswer": +event.target.value
        }));
    }), [cardNumber, dispatch]);

    console.log("render card", cardNumber);
    return (
        <>
            <div className={styles.question}>
                <span id="question">{question}</span>
            </div>
            <div className={styles.answers} onChange={handleOptionChange}>
                { 
                    Array.isArray(answers) && answers.map((item, index) => {
                    const answerNumber = index + 1
                    const key = `card_${cardNumber}_${id}_answer_${answerNumber}`;
                    return <Answer
                        key={key}
                        answerNumber={answerNumber}
                        cardNumber={cardNumber}
                    />
                })}
            </div>
        </>
    );
}
