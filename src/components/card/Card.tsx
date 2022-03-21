import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedAnswer } from "../../store/quizSlice";
import { Answer } from "../answer/Answer";

import styles from "./Card.module.css";
// import data from '../../cardData.json'

interface ICardProps {
    cardNumber: number
}

export function Card(props: ICardProps) {
    const {cardNumber} = props;
    const dispatch = useAppDispatch();

    const question =  useAppSelector(state => {
        if (state.quiz.quiz && state.quiz.quiz.length !== 0) {
            return state.quiz.quiz[(cardNumber - 1)]["question"]
        }
    });

    const answers = useAppSelector(state => {
        if (state.quiz.quiz && state.quiz.quiz.length !== 0) {
            return state.quiz.quiz[(cardNumber - 1)]["answers"]
        }
    });

    const id = useAppSelector(state => {
        if (state.quiz.quiz && state.quiz.quiz.length !== 0) {
            return state.quiz.quiz[(cardNumber - 1)]["id"]
        }
    });

    const handleOptionChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedAnswer({ 
            cardNumber, 
            "selectedAnswer": +event.target.value}));
    };

    const handleOptionChange = useCallback(handleOptionChange1, [cardNumber, dispatch]);

    console.log("render card", cardNumber);

    return (
        <>
            
                <>
                    <div className={styles.question}>
                        <span id="question">{question}</span>
                    </div>
                    <div className={styles.answers} onChange={handleOptionChange}>
                    {answers && answers.map((item, index) => {
                            const key = "card_" + cardNumber + "_answer_" + (index + 1) + "_" + data.id;
                            return <Answer
                                key={key}
                                text={item}
                                name={"answer" + id}
                                value={index + 1}
                                checked={data.selectedAnswer === (index + 1) ? true : false}
                                labelId={key}
                            />
                        }
                        )}
                    </div>
                </>
            
        </>
    );
}
