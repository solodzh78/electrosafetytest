import React from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedAnswer } from "../../store/mainSlice";
import { Answer } from "../answer/Answer";
import styles from "./Card.module.scss";


export const Card: React.FC<{cardNumber: number}> = function({ cardNumber }) {

    const id = useAppSelector(({ main: { quiz: { ticket } } }: RootState) => 
    ticket?.length !== 0 && ticket[cardNumber - 1].id);
    const question = useAppSelector(({ main: { quiz: { ticket } } }: RootState) => 
    ticket?.length !== 0 && ticket[cardNumber - 1].question);
    const answersCount = useAppSelector(({ main: { quiz: { ticket } } }: RootState) => 
    ticket?.length !== 0 && ticket[cardNumber - 1].answers.length);

    const dispatch = useAppDispatch();
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setSelectedAnswer({
                cardNumber,
                "selectedAnswer": +event.target.value
            })
        )};

    console.log("render card", cardNumber);

    return (
        <div className={styles.card}>
            <div className={styles.card__question} id={`card${cardNumber}`}>
                <span className={styles['card__question-number']}>Вопрос №{cardNumber}</span>
                <span className={styles['card__question-text']}>{question}</span>
            </div>
            <div className={styles.card__answers} onChange={handleOptionChange}>
                { 
                    answersCount && [...new Array(answersCount)].map((item, index) => {
                    const answerNumber = index + 1
                    const key = `card_${cardNumber}_${id}_answer_${answerNumber}`;
                    return <Answer
                        key={key}
                        answerNumber={answerNumber}
                        cardNumber={cardNumber}
                        classNames={styles}
                        classAnswerInput={styles.answer__input}
                        classAnswerLabel={styles.answer__label}
                    />
                })}
            </div>
        </div>
    );
}
