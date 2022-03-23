import React from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector, useGetValueFromStore } from "../../store/hooks";
import { setSelectedAnswer } from "../../store/quizSlice";
import { Answer } from "../answer/Answer";
import styles from "./Card.module.scss";

interface ICardProps {
    cardNumber: number
}

export function Card({ cardNumber }: ICardProps) {

    const dispatch = useAppDispatch();

    const question = useGetValueFromStore("question", cardNumber); 
    const answersCount = useAppSelector(({ quiz: { quiz } }: RootState) => 
        quiz && 
        quiz.length !== 0 && 
        quiz[cardNumber - 1].answers.length);
    const id = useGetValueFromStore("id", cardNumber);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedAnswer({
            cardNumber,
            "selectedAnswer": +event.target.value
        }));
    }

    console.log("render card", cardNumber);
    return (
        <>
            <div className={styles.question}>
                <span className={styles.number}>Вопрос №{cardNumber}</span>
                <span>{question}</span>
            </div>
            <div className={styles.answers} onChange={handleOptionChange}>
                { 
                    answersCount && [...new Array(answersCount)].map((item, index) => {
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
