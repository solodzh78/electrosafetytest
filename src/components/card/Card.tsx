import React from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedAnswer } from "../../store/mainSlice";
import { Answer } from "../answer/Answer";
import styles from "./Card.module.scss";

interface ICardProps {
    cardNumber: number
}

export const Card: React.FC<ICardProps> = function({ cardNumber }) {

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
        <>
            <div className={styles.question} id={`card${cardNumber}`}>
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
